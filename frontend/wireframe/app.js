/**
 * Guardian Goggles — Parent App Wireframe (vanilla)
 * Prefers Backend mock (http://127.0.0.1:8787); falls back to data/fixtures/.
 * Locks: wearable sensor; SubmersionSuspect ≠ LostConnection; never BLE=drowning;
 * Free=1 child + today history; Sub=multi + richHistory; ASP note if pricing.
 * Timeline replay + labeled sound/haptic stubs.
 */
(function () {
  "use strict";

  const FIXTURE_BASE = "../../data/fixtures";
  const DEFAULT_MOCK_BASE = "http://127.0.0.1:8787";
  const SCENARIOS = [
    "happy_path",
    "ble_blip_lt_10s",
    "submersion_gt_10s",
    "walkaway_lost",
    "multi_child_one_alert",
  ];

  /** Fixture seconds → wall-clock ms at 1x (demo scale: 1s fixture ≈ 150ms) */
  const MS_PER_FIXTURE_SEC_1X = 150;

  const ASP_DEFAULT = {
    launchKitUsd: "150-250",
    subscriptionUsdMo: 2.99,
    subscriptionCovers: ["multiChild", "familySharing", "richHistory"],
    coreAlertsPaywalled: false,
  };

  const params = new URLSearchParams(location.search);
  // ?mock=0 → fixtures only; ?mock=http://host:port → custom mock; default probes 8787
  const mockParam = params.get("mock");
  const mockBase =
    mockParam === "0" || mockParam === "off" || mockParam === "false"
      ? null
      : mockParam && mockParam !== "1" && mockParam !== "on"
        ? mockParam.replace(/\/$/, "")
        : DEFAULT_MOCK_BASE;

  const state = {
    scenarioId: "happy_path",
    scenario: null,
    household: null,
    childrenLive: [],
    screen: "onboarding",
    onboardStep: 0,
    alertDismissed: false,
    openAlertType: null,
    sessionOverride: null,
    blipBanner: null,
    timelineNote: "",
    playing: false,
    fixtureT: 0,
    nextEventIdx: 0,
    speed: 2,
    mute: false,
    rafId: null,
    lastWall: 0,
    dataSource: "—", // "mock" | "fixtures"
    mockAvailable: false,
    playMode: "local", // "sse" | "local"
    sse: null,
    inviteEmail: "",
    inviteRole: "caregiver",
    invitees: [],
    inviteFlash: null,
  };

  const $ = (sel) => document.querySelector(sel);
  const root = () => $("#screenRoot");
  const tabBar = () => $("#tabBar");

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function initials(name) {
    return (name || "?")
      .split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function formatTime(iso) {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return (
        d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Chicago",
        }) + " CT"
      );
    } catch {
      return iso;
    }
  }

  function chipFor(conn) {
    const map = {
      connected: ["ok", "Connected"],
      monitoring: ["mon", "Monitoring"],
      submersion_suspect: ["danger", "Check now"],
      lost_connection: ["lost", "Lost connection"],
      offline: ["offline", "Offline"],
    };
    const [cls, label] = map[conn] || ["offline", conn || "Unknown"];
    return `<span class="chip ${cls}">${label}</span>`;
  }

  async function loadJson(path, opts) {
    const res = await fetch(path, opts);
    if (!res.ok) throw new Error(`Failed ${path}: ${res.status}`);
    return res.json();
  }

  function entitlementTier(scenario) {
    const e = scenario.entitlementResolved || scenario.entitlement;
    if (e && typeof e === "object") return e.tier || "free";
    if (typeof e === "string") return e;
    return "free";
  }

  function householdFileFor(scenario) {
    if (scenario.householdRef) return scenario.householdRef;
    return entitlementTier(scenario) === "sub"
      ? "household_sub.json"
      : "household_free.json";
  }

  function mergeHousehold(scenario, fileHousehold) {
    const resolved =
      (scenario && (scenario.entitlementResolved || scenario.entitlement)) || {};
    const base = fileHousehold && typeof fileHousehold === "object" ? fileHousehold : {};
    const ent = typeof resolved === "object" && resolved ? resolved : {};
    return {
      householdId: ent.householdId || base.householdId || "hh_demo",
      tier: ent.tier || base.tier || "free",
      maxChildren: ent.maxChildren != null ? ent.maxChildren : base.maxChildren != null ? base.maxChildren : 1,
      familySharingEnabled:
        ent.familySharingEnabled != null
          ? ent.familySharingEnabled
          : !!base.familySharingEnabled,
      richHistoryEnabled:
        ent.richHistoryEnabled != null
          ? ent.richHistoryEnabled
          : !!base.richHistoryEnabled,
      aspNote: base.aspNote || ASP_DEFAULT,
      parentDisplayName: base.parentDisplayName || "Demo parent",
    };
  }

  async function probeMock() {
    if (!mockBase) {
      state.mockAvailable = false;
      return false;
    }
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 700);
      const res = await fetch(`${mockBase}/health`, { signal: ctrl.signal });
      clearTimeout(t);
      state.mockAvailable = res.ok;
      return res.ok;
    } catch {
      state.mockAvailable = false;
      return false;
    }
  }

  async function loadFromMock(id) {
    const scenario = await loadJson(`${mockBase}/v0/scenarios/${id}`);
    let fileHousehold = null;
    try {
      fileHousehold = await loadJson(
        `${FIXTURE_BASE}/${householdFileFor(scenario)}`
      );
    } catch (_) {
      /* aspNote from defaults */
    }
    return {
      scenario,
      household: mergeHousehold(scenario, fileHousehold),
      source: "mock",
    };
  }

  async function loadFromFixtures(id) {
    const scenario = await loadJson(`${FIXTURE_BASE}/scenarios/${id}.json`);
    const household = await loadJson(
      `${FIXTURE_BASE}/${householdFileFor(scenario)}`
    );
    return {
      scenario,
      household: mergeHousehold(scenario, household),
      source: "fixtures",
    };
  }

  /* ---------- Sound / haptic stubs (Web Audio + vibrate) ---------- */

  let audioCtx = null;

  function getAudioCtx() {
    if (state.mute) return null;
    try {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        audioCtx = new AC();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch {
      return null;
    }
  }

  function tone(ctx, freq, start, dur, type, gainPeak) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gainPeak, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(start);
    o.stop(start + dur + 0.02);
  }

  /** Urgent repeating high-urgency beep — SubmersionSuspect only */
  function playSubmersionStub() {
    if (state.mute) return;
    const ctx = getAudioCtx();
    if (ctx) {
      const t0 = ctx.currentTime;
      for (let cycle = 0; cycle < 2; cycle++) {
        const base = t0 + cycle * 0.55;
        tone(ctx, 880, base, 0.12, "square", 0.18);
        tone(ctx, 1040, base + 0.14, 0.12, "square", 0.18);
        tone(ctx, 880, base + 0.28, 0.12, "square", 0.16);
      }
    }
    try {
      if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40, 120, 60, 80, 40, 80]);
    } catch (_) {}
  }

  /** Softer two-tone / lower urgency — LostConnection only */
  function playLostStub() {
    if (state.mute) return;
    const ctx = getAudioCtx();
    if (ctx) {
      const t0 = ctx.currentTime;
      tone(ctx, 392, t0, 0.22, "sine", 0.08);
      tone(ctx, 523, t0 + 0.28, 0.28, "sine", 0.07);
      tone(ctx, 392, t0 + 0.75, 0.22, "sine", 0.07);
      tone(ctx, 523, t0 + 1.03, 0.28, "sine", 0.06);
    }
    try {
      if (navigator.vibrate) navigator.vibrate([30, 80, 30]);
    } catch (_) {}
  }

  function stopStubAudio() {}

  /* ---------- Timeline engine ---------- */

  function updateTimelineUI() {
    const el = $("#timelineT");
    if (el) el.textContent = `t=${Math.floor(state.fixtureT)}s`;
    const note = $("#timelineNote");
    if (note) {
      const tl = (state.scenario && state.scenario.timeline) || [];
      note.textContent = state.timelineNote
        ? `t=${Math.floor(state.fixtureT)}s · ${state.timelineNote}`
        : state.playing
          ? `Playing (${state.playMode || "local"}) · ${tl.length} events · speed ${state.speed}x`
          : `Timeline idle · ${tl.length} events`;
    }
    const playBtn = $("#btnPlay");
    if (playBtn) playBtn.textContent = state.playing ? "Playing…" : "Play";
  }

  function updateDataSourceUI() {
    const badge = $("#dataSourceBadge");
    if (badge) {
      let label = "…";
      if (state.dataSource === "mock") {
        try {
          const u = new URL(mockBase || DEFAULT_MOCK_BASE);
          label = `Mock :${u.port || "8787"}`;
        } catch {
          label = "Mock :8787";
        }
      } else if (state.dataSource === "fixtures") {
        label = "Fixtures (fallback)";
      }
      badge.textContent = label;
      badge.dataset.source = state.dataSource;
    }
  }

  function childLive(childId) {
    return state.childrenLive.find((c) => c.childId === childId);
  }

  function applyEvent(ev) {
    const kind = ev.kind;
    const child = ev.childId ? childLive(ev.childId) : null;

    if (ev.note) state.timelineNote = ev.note;
    else state.timelineNote = kind;

    switch (kind) {
      case "note":
        break;

      case "session_start":
        state.sessionOverride = true;
        if (child) {
          child.sessionActive = true;
          if (ev.connectionState) child.connectionState = ev.connectionState;
        } else {
          state.childrenLive.forEach((c) => {
            c.sessionActive = true;
            if (ev.connectionState) c.connectionState = ev.connectionState;
          });
        }
        if (state.screen === "alert_submersion" || state.screen === "alert_lost") {
          /* keep alert if open */
        } else if (state.screen !== "home") {
          state.screen = "home";
        }
        break;

      case "session_end":
        state.sessionOverride = false;
        if (child) {
          child.sessionActive = false;
          if (ev.connectionState) child.connectionState = ev.connectionState;
          else child.connectionState = "connected";
        } else {
          state.childrenLive.forEach((c) => {
            c.sessionActive = false;
            c.connectionState = "connected";
          });
        }
        state.openAlertType = null;
        state.alertDismissed = true;
        state.screen = "home";
        break;

      case "state_change":
        if (child && ev.connectionState) {
          child.connectionState = ev.connectionState;
        }
        break;

      case "battery_tick":
        if (child && ev.note) {
          const m = /batteryPct\s*=\s*(\d+)/i.exec(ev.note);
          if (m) {
            child.batteryPct = Number(m[1]);
            if (child.deviceHealth) child.deviceHealth.batteryPct = child.batteryPct;
          }
        }
        break;

      case "blip_start":
        state.blipBanner = ev.note || "Brief signal gap…";
        if (child && ev.connectionState) child.connectionState = ev.connectionState;
        break;

      case "blip_end":
        state.blipBanner =
          ev.note ||
          (state.scenario &&
            state.scenario.demoFocus &&
            state.scenario.demoFocus.blipBanner) ||
          "Signal restored — still monitoring";
        if (child) {
          child.connectionState = ev.connectionState || "monitoring";
        }
        break;

      case "alert_open": {
        if (state.scenarioId === "ble_blip_lt_10s") {
          state.timelineNote = "blip — no alert opened (guard)";
          break;
        }
        const alert =
          (state.scenario.alerts || []).find(
            (a) => a.childId === ev.childId && !a.resolvedAt
          ) || (state.scenario.alerts || [])[0];
        if (!alert) break;
        if (child && ev.connectionState) child.connectionState = ev.connectionState;
        else if (child) {
          child.connectionState =
            alert.type === "SubmersionSuspect"
              ? "submersion_suspect"
              : "lost_connection";
        }
        state.alertDismissed = false;
        state.openAlertType = alert.type;
        if (alert.type === "SubmersionSuspect") {
          state.screen = "alert_submersion";
          playSubmersionStub();
        } else if (alert.type === "LostConnection") {
          state.screen = "alert_lost";
          playLostStub();
        }
        break;
      }

      case "alert_ack":
        state.alertDismissed = true;
        state.openAlertType = null;
        state.screen = "home";
        stopStubAudio();
        break;

      case "alert_resolve":
        state.alertDismissed = true;
        state.openAlertType = null;
        if (child && ev.connectionState) child.connectionState = ev.connectionState;
        else if (child) child.connectionState = "monitoring";
        state.screen = "home";
        stopStubAudio();
        break;

      default:
        break;
    }
  }

  function tick(now) {
    if (!state.playing) return;
    const wallDelta = now - state.lastWall;
    state.lastWall = now;
    const fixtureDelta = (wallDelta / MS_PER_FIXTURE_SEC_1X) * state.speed;
    state.fixtureT += fixtureDelta;

    const tl = (state.scenario && state.scenario.timeline) || [];
    while (
      state.nextEventIdx < tl.length &&
      tl[state.nextEventIdx].t <= state.fixtureT
    ) {
      applyEvent(tl[state.nextEventIdx]);
      state.nextEventIdx += 1;
    }

    updateTimelineUI();
    render();

    if (state.nextEventIdx >= tl.length) {
      state.playing = false;
      state.timelineNote = "Timeline complete";
      updateTimelineUI();
      return;
    }
    state.rafId = requestAnimationFrame(tick);
  }

  function closeSse() {
    if (state.sse) {
      try {
        state.sse.close();
      } catch (_) {}
      state.sse = null;
    }
  }

  function timelinePlayLocal() {
    state.playMode = "local";
    state.playing = true;
    state.lastWall = performance.now();
    updateTimelineUI();
    state.rafId = requestAnimationFrame(tick);
  }

  function timelinePlaySse() {
    if (!mockBase || typeof EventSource === "undefined") {
      timelinePlayLocal();
      return;
    }
    closeSse();
    const intervalMs = Math.max(120, Math.round(800 / (state.speed || 1)));
    const url = `${mockBase}/v0/scenarios/${encodeURIComponent(state.scenarioId)}/stream?intervalMs=${intervalMs}`;
    state.playMode = "sse";
    state.playing = true;
    state.timelineNote = "SSE stream…";
    updateTimelineUI();
    const es = new EventSource(url);
    state.sse = es;
    es.addEventListener("timeline", (msg) => {
      try {
        const ev = JSON.parse(msg.data);
        if (typeof ev.t === "number") state.fixtureT = ev.t;
        applyEvent(ev);
        state.nextEventIdx += 1;
        updateTimelineUI();
        render();
      } catch (err) {
        console.warn("SSE parse failed", err);
      }
    });
    es.addEventListener("done", () => {
      state.playing = false;
      state.timelineNote = "Timeline complete (SSE)";
      closeSse();
      updateTimelineUI();
      render();
    });
    es.onerror = () => {
      console.warn("SSE error → local timeline replay");
      closeSse();
      state.playing = false;
      state.timelineNote = "SSE error → local replay";
      updateTimelineUI();
      const tl = (state.scenario && state.scenario.timeline) || [];
      if (state.nextEventIdx < tl.length) timelinePlayLocal();
    };
  }

  function timelinePlay() {
    if (!state.scenario) return;
    getAudioCtx();
    if (state.playing) return;
    const tl = state.scenario.timeline || [];
    if (state.nextEventIdx >= tl.length) {
      timelineReset(false);
    }
    if (state.dataSource === "mock" && state.mockAvailable) {
      timelinePlaySse();
      return;
    }
    timelinePlayLocal();
  }

  function timelinePause() {
    state.playing = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    state.rafId = null;
    closeSse();
    updateTimelineUI();
  }

  function timelineReset(doRender) {
    timelinePause();
    state.fixtureT = 0;
    state.nextEventIdx = 0;
    state.timelineNote = "Reset";
    state.blipBanner = null;
    state.alertDismissed = false;
    state.openAlertType = null;
    state.sessionOverride = null;

    if (state.scenario) {
      state.childrenLive = clone(state.scenario.children || []);
      const tl = state.scenario.timeline || [];
      if (tl.length) {
        state.childrenLive.forEach((c) => {
          const hasSessionStart = tl.some(
            (e) => e.kind === "session_start" && (!e.childId || e.childId === c.childId)
          );
          if (hasSessionStart) {
            c.connectionState = "connected";
            c.sessionActive = false;
          }
        });
        state.screen =
          state.scenario.initialScreen === "onboarding" ? "onboarding" : "home";
        if (
          state.scenario.initialScreen === "alert_submersion" ||
          state.scenario.initialScreen === "alert_lost"
        ) {
          state.screen = "home";
        }
      } else {
        applyInitialScreen();
      }
    }
    updateTimelineUI();
    if (doRender !== false) render();
  }

  function applyInitialScreen() {
    const scenario = state.scenario;
    const focus = scenario.demoFocus || {};
    if (focus.showAlert && focus.alertType === "SubmersionSuspect") {
      state.screen = "alert_submersion";
      state.openAlertType = "SubmersionSuspect";
    } else if (focus.showAlert && focus.alertType === "LostConnection") {
      state.screen = "alert_lost";
      state.openAlertType = "LostConnection";
    } else if (
      scenario.initialScreen === "alert_submersion" ||
      scenario.initialScreen === "alert_lost"
    ) {
      state.screen = scenario.initialScreen;
      state.openAlertType =
        scenario.initialScreen === "alert_submersion"
          ? "SubmersionSuspect"
          : "LostConnection";
    } else if (scenario.initialScreen === "home") {
      state.screen = "home";
    } else {
      state.screen = "onboarding";
      state.onboardStep = 0;
    }
    if (focus.blipBanner) state.blipBanner = focus.blipBanner;

    // Optional ?screen= / ?onboard= for shots / acceptance
    const screenParam = params.get("screen");
    if (screenParam) {
      const allowed = [
        "onboarding",
        "pairing",
        "home",
        "kids",
        "history",
        "sub",
        "family_invite",
        "alert_submersion",
        "alert_lost",
      ];
      if (allowed.includes(screenParam)) state.screen = screenParam;
    }
    const onboardParam = params.get("onboard");
    if (onboardParam != null && state.screen === "onboarding") {
      state.onboardStep = Math.max(0, Math.min(3, Number(onboardParam) || 0));
    }
  }

  async function loadScenario(id) {
    timelinePause();
    $("#fixtureStatus").textContent = `Loading ${id}…`;
    state.scenarioId = id;
    state.alertDismissed = false;
    state.sessionOverride = null;
    state.openAlertType = null;
    state.blipBanner = null;
    state.fixtureT = 0;
    state.nextEventIdx = 0;
    state.timelineNote = "";
    state.inviteFlash = null;
    state.invitees =
      id === "multi_child_one_alert"
        ? [{ email: "sam@example.com", status: "Accepted (demo)" }]
        : [];

    let loaded = null;
    const mockOk = await probeMock();
    if (mockOk) {
      try {
        loaded = await loadFromMock(id);
      } catch (err) {
        console.warn("Mock load failed, falling back to fixtures", err);
      }
    }
    if (!loaded) {
      loaded = await loadFromFixtures(id);
    }

    state.scenario = loaded.scenario;
    state.household = loaded.household;
    state.childrenLive = clone(loaded.scenario.children || []);
    state.dataSource = loaded.source;
    updateDataSourceUI();

    applyInitialScreen();

    const tier = state.household.tier || entitlementTier(loaded.scenario);
    const nKids = state.childrenLive.length;
    const nTl = (loaded.scenario.timeline || []).length;
    const srcLabel = loaded.source === "mock" ? "mock" : "fixtures";
    $("#fixtureStatus").textContent = `${srcLabel} · ${id} · ${tier} · ${nKids} child(ren) · ${nTl} events`;
    updateTimelineUI();
    render();

    if (state.screen === "alert_submersion") playSubmersionStub();
    if (state.screen === "alert_lost") playLostStub();
  }

  function activeAlert(type) {
    if (!state.scenario || state.alertDismissed) return null;
    if (state.openAlertType && state.openAlertType !== type) return null;
    return (state.scenario.alerts || []).find((a) => a.type === type) || null;
  }

  function childById(id) {
    return (
      state.childrenLive.find((c) => c.childId === id) ||
      (state.scenario.children || []).find((c) => c.childId === id)
    );
  }

  function primaryChild() {
    const alert = (state.scenario.alerts || [])[0];
    if (alert) return childById(alert.childId) || state.childrenLive[0];
    return state.childrenLive[0];
  }

  function sessionActive() {
    if (state.sessionOverride !== null) return state.sessionOverride;
    const focus = state.scenario.demoFocus || {};
    if (typeof focus.sessionActive === "boolean") return focus.sessionActive;
    return state.childrenLive.some((c) => c.sessionActive);
  }

  function historyEntries() {
    const all = state.scenario.history || [];
    const rich = state.household.richHistoryEnabled;
    if (rich) return all;
    const demoDate = state.scenario.demoDate;
    return all.filter((h) => {
      if (h.richOnly) return false;
      if (demoDate && h.at && !String(h.at).startsWith(demoDate)) return false;
      return true;
    });
  }

  /* ---------- Screens ---------- */

  function renderOnboarding() {
    const steps = [
      {
        title: "An extra layer for pool time",
        body: "Guardian Goggles helps you monitor a wearable sensor during an intentional Pool Session. It is a backup — not a life-safety guarantee. Quiet does not mean safe.",
      },
      {
        title: "Two different alerts — never confused",
        body: "We use completely different screens and sounds so you always know what happened.",
        compare: true,
      },
      {
        title: "Allow critical alerts",
        body: "Core safety alerts work on the free plan and can override silent / Do Not Disturb where your phone allows. We never paywall SubmersionSuspect or Lost Connection.",
        criticalStub: true,
      },
      {
        title: "Ready to pair",
        body: "Next you’ll pair one wearable BLE sensor with one child profile (free). Subscription unlocks multi-child, family sharing, and richer history — not core alerts.",
      },
    ];
    const step = steps[state.onboardStep] || steps[0];
    const dots = steps
      .map((_, i) => `<span class="${i === state.onboardStep ? "on" : ""}"></span>`)
      .join("");

    let compare = "";
    if (step.compare) {
      compare = `
        <div class="compare">
          <div class="compare-item subm">
            <strong>⚠ Possible prolonged submersion</strong>
            Signal absent &gt;~10s during a Pool Session → check on your child now. Not a drowning diagnosis from BLE alone.
            <span class="stub-inline">Sound stub: urgent pulse · Haptic stub: heavy</span>
          </div>
          <div class="compare-item lost">
            <strong>📡 Lost connection</strong>
            Monitoring interrupted (range, battery, interference). Distinct look &amp; sound — never the same as submersion.
            <span class="stub-inline">Sound stub: soft dual-tone · Haptic stub: light</span>
          </div>
        </div>`;
    }

    const criticalChip = step.criticalStub
      ? `<span class="critical-stub-chip">Critical Alerts stub</span>`
      : "";

    return `
      <div class="progress-dots">${dots}</div>
      <div class="onboard-hero">
        <h2>${step.title}</h2>
        <p>${step.body}</p>
        ${criticalChip}
      </div>
      ${compare}
      <div class="btn-stack">
        ${
          state.onboardStep < steps.length - 1
            ? `<button type="button" class="btn btn-primary" data-action="onboard-next">Continue</button>`
            : `<button type="button" class="btn btn-primary" data-action="goto-pairing">Pair wearable sensor</button>`
        }
        <button type="button" class="btn btn-ghost" data-action="goto-home">Skip to home (demo)</button>
      </div>`;
  }

  function renderPairing() {
    const child = state.childrenLive[0] || state.scenario.children[0];
    return `
      <h2 class="screen-title">Pair wearable sensor</h2>
      <p class="screen-sub">Hold the sensor near your phone. Form factor is HOLD — this works with any wearable BLE sensor, not goggles-only.</p>
      <div class="pair-ring">Searching for<br/>wearable sensor…</div>
      <div class="card">
        <div class="meta-row"><span>Child</span><span>${child.displayName}</span></div>
        <div class="meta-row"><span>Sensor</span><span>${child.sensorId}</span></div>
        <div class="meta-row"><span>Battery</span><span>${child.batteryPct}%</span></div>
        <div class="meta-row"><span>Last seen</span><span>${formatTime(child.lastSeenAt)}</span></div>
        <div class="meta-row"><span>childId</span><span class="mono">${child.childId}</span></div>
      </div>
      <div class="btn-stack">
        <button type="button" class="btn btn-primary" data-action="goto-home">Finish pairing</button>
        <button type="button" class="btn btn-ghost" data-action="goto-onboarding">Back</button>
      </div>`;
  }

  function renderHome() {
    const kids = state.childrenLive;
    const active = sessionActive();
    const blip =
      state.blipBanner ||
      (state.scenario.demoFocus && state.scenario.demoFocus.blipBanner);
    const hh = state.household;

    const cards = kids
      .map((c) => {
        const showConn = active ? c.connectionState : "connected";
        const warnOffline =
          active &&
          (c.connectionState === "lost_connection" ||
            c.connectionState === "offline" ||
            c.connectionState === "submersion_suspect" ||
            (c.batteryPct != null && c.batteryPct < 20));
        return `
        <div class="card ${warnOffline ? "card-attention" : ""}">
          <div class="child-card">
            <div class="avatar">${initials(c.displayName)}</div>
            <div class="child-info">
              <h4>${c.displayName}</h4>
              <div class="sub">${c.sensorId} · wearable sensor</div>
              <div class="chip-row">${chipFor(showConn)}</div>
            </div>
          </div>
          <div class="health-strip">
            <div class="health-pill">Battery<strong class="${c.batteryPct < 20 ? "warn-text" : ""}">${c.batteryPct}%</strong></div>
            <div class="health-pill">Last seen<strong>${formatTime(c.lastSeenAt)}</strong></div>
          </div>
        </div>`;
      })
      .join("");

    return `
      <div class="title-row">
        <h2 class="screen-title">Pool Session</h2>
        <span class="tier-pill ${hh.tier === "sub" ? "sub" : ""}">${hh.tier === "sub" ? "Family" : "Free"}</span>
      </div>
      <p class="screen-sub">Backup monitoring while kids are in the water. Start a session when you're poolside.</p>
      ${blip ? `<div class="blip-note">${blip}</div>` : ""}
      <div class="session-banner ${active ? "" : "off"}">
        <h3>${active ? "Session active" : "No active session"}</h3>
        <p>${active ? "Wearable sensor(s) being monitored." : "Start when you're ready — cuts outside-pool noise."}</p>
        <div class="btn-stack tight">
          <button type="button" class="btn ${active ? "btn-ghost" : "btn-primary"}" data-action="toggle-session">
            ${active ? "End Pool Session" : "Start Pool Session"}
          </button>
        </div>
      </div>
      ${cards}
      ${
        state.scenarioId === "submersion_gt_10s" ||
        state.scenarioId === "multi_child_one_alert"
          ? `<button type="button" class="btn btn-danger demo-jump" data-action="show-submersion">Demo: open SubmersionSuspect</button>`
          : ""
      }
      ${
        state.scenarioId === "walkaway_lost"
          ? `<button type="button" class="btn demo-jump demo-jump-lost" data-action="show-lost">Demo: open Lost Connection</button>`
          : ""
      }
    `;
  }

  function renderAlertSubmersion() {
    const alert = activeAlert("SubmersionSuspect");
    if (!alert) {
      state.screen = "home";
      return renderHome();
    }
    const child = childById(alert.childId) || primaryChild();
    return `
      <div class="alert-submersion" role="alertdialog" aria-labelledby="subm-title">
        <span class="alert-badge-subm">SubmersionSuspect</span>
        <span class="critical-stub-chip on-alert">Critical Alerts stub</span>
        <div class="pulse-icon" aria-hidden="true">⚠</div>
        <h2 id="subm-title">${alert.headline || "Possible prolonged submersion — check on your child now"}</h2>
        <p class="child-tag">${child.displayName}</p>
        <p class="body">${alert.body || ""}</p>
        <div class="sound-stub-badge urgent" aria-label="Sound and haptic stub labels">
          Sound stub: urgent pulse · Haptic stub: heavy
        </div>
        <div class="btn-stack alert-actions">
          <button type="button" class="btn btn-looking" data-action="ack-looking">I'm looking</button>
          <button type="button" class="btn btn-ack" data-action="ack-alert">Acknowledge</button>
          <button type="button" class="btn btn-false" data-action="false-alarm">False alarm</button>
        </div>
      </div>`;
  }

  function renderAlertLost() {
    const alert = activeAlert("LostConnection");
    if (!alert) {
      state.screen = "home";
      return renderHome();
    }
    const child = childById(alert.childId) || primaryChild();
    const checks = (alert.checklist || [
      "Move closer to the pool area",
      "Check wearable sensor battery",
      "Confirm the sensor is securely attached",
      "Watch for interference (walls, thick doors)",
    ])
      .map((c) => `<li><span class="box"></span><span>${c}</span></li>`)
      .join("");

    return `
      <div class="alert-lost" role="alertdialog" aria-labelledby="lost-title">
        <span class="alert-badge-lost">Lost Connection</span>
        <span class="critical-stub-chip on-alert">Critical Alerts stub</span>
        <div class="signal-icon" aria-hidden="true">📡</div>
        <h2 id="lost-title">${alert.headline || "Lost connection — monitoring interrupted"}</h2>
        <p class="body">${alert.body || `We can't reach ${child.displayName}'s wearable sensor. This is not a submersion alert.`}</p>
        <div class="sound-stub-badge soft" aria-label="Sound and haptic stub labels">
          Sound stub: soft dual-tone · Haptic stub: light
        </div>
        <ul class="checklist">${checks}</ul>
        <div class="btn-stack alert-actions">
          <button type="button" class="btn btn-restore" data-action="ack-alert">Got it — I'll check</button>
          <button type="button" class="btn btn-dismiss" data-action="ack-alert">Dismiss</button>
        </div>
      </div>`;
  }

  function renderKids() {
    const hh = state.household;
    const kids = state.childrenLive;
    const rows = kids
      .map(
        (c) => `
      <div class="list-row">
        <div class="avatar">${initials(c.displayName)}</div>
        <div class="child-info">
          <h4>${c.displayName}</h4>
          <div class="sub">${c.sensorId} · ${c.batteryPct}% · ${chipFor(c.connectionState)}</div>
          <div class="sub mono">${c.childId}</div>
        </div>
      </div>`
      )
      .join("");

    const canAdd = kids.length < hh.maxChildren;
    return `
      <h2 class="screen-title">Kids & devices</h2>
      <p class="screen-sub">Free: 1 child. Subscription unlocks multi-child — core alerts stay free.</p>
      <span class="tier-pill ${hh.tier === "sub" ? "sub" : ""}">${hh.tier} · max ${hh.maxChildren}</span>
      <div class="card">${rows || '<div class="empty">No children</div>'}</div>
      ${
        canAdd
          ? `<button type="button" class="btn btn-primary" data-action="noop">Add child</button>`
          : `<div class="gate-note">Free plan includes 1 child. Upgrade (~$2.99/mo) for multi-child & family sharing — not to unlock alerts.</div>
             <button type="button" class="btn btn-primary" data-action="goto-sub">See Family plan</button>`
      }`;
  }

  function renderHistory() {
    const hh = state.household;
    const entries = historyEntries();
    const items = entries
      .map(
        (h) => `
      <div class="hist-item">
        <div class="when">${formatTime(h.at)}${h.alertType ? " · " + h.alertType : ""}</div>
        <div class="lbl">${h.label}</div>
      </div>`
      )
      .join("");

    return `
      <h2 class="screen-title">History</h2>
      <p class="screen-sub">${
        hh.richHistoryEnabled
          ? "Rich history included with your plan."
          : "Free: today’s sessions only. Upgrade for richer timelines."
      }</p>
      <span class="tier-pill ${hh.tier === "sub" ? "sub" : ""}">${hh.richHistoryEnabled ? "richHistory" : "today only"}</span>
      <div class="card">${items || '<div class="empty">No entries today</div>'}</div>
      ${
        !hh.richHistoryEnabled
          ? `<div class="upsell">
              <h3>Unlock richer history</h3>
              <p>Trends, past sessions, and family sharing — core safety alerts stay free.</p>
              <button type="button" class="btn btn-primary" data-action="goto-sub">View Family plan</button>
            </div>`
          : `<div class="card soft placeholder-rich">
              <strong>Rich history placeholder</strong>
              <p class="screen-sub" style="margin:6px 0 0">Trends &amp; past sessions (paid stub).</p>
            </div>`
      }`;
  }

  function renderSub() {
    const hh = state.household;
    const asp = hh.aspNote || ASP_DEFAULT;
    const sharingOn = !!hh.familySharingEnabled;
    const isSub = hh.tier === "sub";
    const inviteList =
      state.invitees.length === 0
        ? `<div class="invitee empty-invite">No invites yet.</div>`
        : state.invitees
            .map(
              (inv) => `
          <div class="invitee">
            <div class="invitee-email">${inv.email}</div>
            <div class="invitee-status">${inv.status}</div>
          </div>`
            )
            .join("");
    const flash = state.inviteFlash
      ? `<div class="invite-flash" role="status">${state.inviteFlash}</div>`
      : "";
    const inviteBlock = sharingOn
      ? `
      <div class="card soft family-card">
        <div class="stub-banner">STUB · Family sharing invite</div>
        <h3 class="card-heading">Invite a caregiver</h3>
        <p class="screen-sub" style="margin-bottom:10px">
          Paid plan includes family sharing. Demo stub — nothing is emailed.
        </p>
        ${flash}
        <label class="field-label" for="inviteEmailPlan">Email</label>
        <div class="invite-row">
          <input id="inviteEmailPlan" class="field-input" type="email" placeholder="caregiver@example.com"
            value="${(state.inviteEmail || "").replace(/"/g, "&quot;")}" data-field="inviteEmail" autocomplete="off" />
          <button type="button" class="btn btn-primary invite-btn" data-action="invite-send">Invite</button>
        </div>
        <div class="invitee-list">
          <div class="invitee-list-label">People</div>
          ${inviteList}
        </div>
        <button type="button" class="btn btn-ghost" data-action="goto-family-invite" style="margin-top:10px">
          Open full invite sheet
        </button>
      </div>`
      : `
      <div class="upsell">
        <h3>~$2.99 / month · Family plan</h3>
        <p>Multi-child monitoring, invite caregivers, and richer history — never “unlock alerts.” Core SubmersionSuspect and Lost Connection stay free.</p>
        <button type="button" class="btn btn-primary" data-action="noop">Start Family plan (demo)</button>
      </div>`;
    return `
      <h2 class="screen-title">Family plan</h2>
      <p class="screen-sub">Optional extras. Core SubmersionSuspect and Lost Connection alerts are always free.</p>
      <div class="card">
        <div class="meta-row"><span>Current</span><span>${isSub ? "Family (sub)" : "Free"}</span></div>
        <div class="meta-row"><span>Children</span><span>up to ${hh.maxChildren}</span></div>
        <div class="meta-row"><span>Family sharing</span><span>${sharingOn ? "On" : "Off"}</span></div>
        <div class="meta-row"><span>Rich history</span><span>${hh.richHistoryEnabled ? "On" : "Off"}</span></div>
      </div>
      ${inviteBlock}
      ${
        isSub
          ? `<div class="card soft"><div class="meta-row"><span>Manage</span><span>Family plan (demo)</span></div></div>`
          : ""
      }
      <div class="price-note">
        <strong>ASP note:</strong> Launch kit ~$${asp.launchKitUsd || "150-250"} (hardware-first).
        Subscription ~$${asp.subscriptionUsdMo || "2.99"}/mo for extras only
        (${(asp.subscriptionCovers || []).join(", ") || "multi-child, family, history"}).
        Core alerts are not paywalled.
      </div>`;
  }

  function renderFamilyInvite() {
    const hh = state.household;
    return `
      <div class="sheet-screen">
        <div class="stub-banner">STUB · Not a real invite</div>
        <h2 class="screen-title">Invite caregiver</h2>
        <p class="screen-sub">
          Paid family sharing lets another adult follow Pool Sessions and alerts.
          This wireframe does not send email or create accounts.
        </p>
        <div class="card">
          <label class="field-label" for="inviteEmail">Email</label>
          <input id="inviteEmail" class="field-input" type="email" placeholder="caregiver@example.com"
            value="${state.inviteEmail || ""}" data-field="inviteEmail" />
          <label class="field-label" for="inviteRole">Role</label>
          <select id="inviteRole" class="field-input" data-field="inviteRole">
            <option value="caregiver" ${state.inviteRole === "caregiver" ? "selected" : ""}>Caregiver</option>
            <option value="co_parent" ${state.inviteRole === "co_parent" ? "selected" : ""}>Co-parent</option>
          </select>
          <div class="meta-row" style="margin-top:10px">
            <span>Plan</span>
            <span>${hh.tier === "sub" ? "Family (sharing on)" : "Free (upsell)"}</span>
          </div>
        </div>
        <div class="btn-stack">
          <button type="button" class="btn btn-primary" data-action="send-invite-stub">Send invite (stub)</button>
          <button type="button" class="btn btn-ghost" data-action="goto-sub">Back to Plan</button>
        </div>
        <p class="tiny muted stub-foot">Deep-link / push invite is out of scope for this cut.</p>
      </div>`;
  }

  function render() {
    if (!state.scenario) {
      root().innerHTML = `<div class="empty">Loading fixtures…<br/><span class="tiny">Serve from /workspace/guardian-goggles with python -m http.server</span></div>`;
      return;
    }

    const overlay =
      state.screen === "alert_submersion" || state.screen === "alert_lost";
    tabBar().classList.toggle(
      "hidden",
      overlay ||
        state.screen === "onboarding" ||
        state.screen === "pairing" ||
        state.screen === "family_invite"
    );

    tabBar().querySelectorAll(".tab").forEach((t) => {
      const nav = t.dataset.nav;
      const active =
        nav === state.screen || (state.screen === "family_invite" && nav === "sub");
      t.classList.toggle("active", active);
    });

    let html = "";
    switch (state.screen) {
      case "onboarding":
        html = renderOnboarding();
        break;
      case "pairing":
        html = renderPairing();
        break;
      case "home":
        html = renderHome();
        break;
      case "alert_submersion":
        html = renderAlertSubmersion();
        break;
      case "alert_lost":
        html = renderAlertLost();
        break;
      case "kids":
        html = renderKids();
        break;
      case "history":
        html = renderHistory();
        break;
      case "sub":
        html = renderSub();
        break;
      case "family_invite":
        html = renderFamilyInvite();
        break;
      default:
        html = renderHome();
    }
    root().innerHTML = html;
  }

  function onAction(action) {
    switch (action) {
      case "onboard-next":
        state.onboardStep += 1;
        break;
      case "goto-pairing":
        state.screen = "pairing";
        break;
      case "goto-onboarding":
        state.screen = "onboarding";
        state.onboardStep = 0;
        break;
      case "goto-home":
        state.screen = "home";
        break;
      case "goto-sub":
        state.screen = "sub";
        break;
      case "goto-family-invite":
        state.screen = "family_invite";
        break;
      case "invite-send": {
        const email = (state.inviteEmail || "").trim();
        if (!email || !email.includes("@")) {
          state.inviteFlash = "Enter a valid email (demo).";
          break;
        }
        state.invitees = [
          ...state.invitees,
          { email, status: "Invite queued (stub — not sent)" },
        ];
        state.inviteEmail = "";
        state.inviteFlash = `Stub: would invite ${email}`;
        break;
      }
      case "send-invite-stub": {
        const email = (state.inviteEmail || "").trim() || "caregiver@example.com";
        state.invitees = [
          ...state.invitees,
          { email, status: "Invite queued (stub — not sent)" },
        ];
        state.timelineNote = "Invite stub — nothing sent";
        state.inviteFlash = `Stub: would invite ${email}`;
        updateTimelineUI();
        state.screen = "sub";
        break;
      }
      case "toggle-session":
        state.sessionOverride = !sessionActive();
        break;
      case "show-submersion":
        state.alertDismissed = false;
        state.openAlertType = "SubmersionSuspect";
        state.screen = "alert_submersion";
        playSubmersionStub();
        break;
      case "show-lost":
        state.alertDismissed = false;
        state.openAlertType = "LostConnection";
        state.screen = "alert_lost";
        playLostStub();
        break;
      case "ack-looking":
      case "ack-alert":
      case "false-alarm":
        state.alertDismissed = true;
        state.openAlertType = null;
        state.screen = "home";
        break;
      case "noop":
        break;
      default:
        break;
    }
    render();
  }

  function showLoadError(err) {
    console.error(err);
    $("#fixtureStatus").textContent = "Load failed — start http.server (+ optional mock)";
    root().innerHTML = `
      <div class="card" style="margin-top:24px">
        <h3 style="margin-top:0">Could not load scenario data</h3>
        <p class="screen-sub">Serve the repo root, then optionally start the Backend mock:</p>
        <pre class="code-block">cd drowning-prevention
python3 -m http.server 8765
# optional mock:
node backend/mocks/server.js
# open http://127.0.0.1:8765/frontend/wireframe/
# fixtures-only: ?mock=0</pre>
        <p class="tiny muted">${String(err.message || err)}</p>
      </div>`;
  }

  function bind() {
    $("#scenarioSelect").addEventListener("change", (e) => {
      loadScenario(e.target.value).catch(showLoadError);
    });
    $("#btnReload").addEventListener("click", () => {
      loadScenario(state.scenarioId).catch(showLoadError);
    });
    $("#btnPlay").addEventListener("click", () => timelinePlay());
    $("#btnPause").addEventListener("click", () => timelinePause());
    $("#btnReset").addEventListener("click", () => timelineReset(true));
    $("#speedSelect").addEventListener("change", (e) => {
      state.speed = Number(e.target.value) || 1;
      updateTimelineUI();
    });
    $("#btnMute").addEventListener("click", () => {
      state.mute = !state.mute;
      const btn = $("#btnMute");
      btn.textContent = state.mute ? "Unmute" : "Mute";
      btn.setAttribute("aria-pressed", state.mute ? "true" : "false");
      btn.classList.toggle("muted-on", state.mute);
    });
    root().addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (btn) onAction(btn.dataset.action);
    });
    root().addEventListener("input", (e) => {
      const el = e.target.closest("[data-field]");
      if (!el) return;
      if (el.dataset.field === "inviteEmail") state.inviteEmail = el.value;
      if (el.dataset.field === "inviteRole") state.inviteRole = el.value;
    });
    root().addEventListener("change", (e) => {
      const el = e.target.closest("[data-field]");
      if (!el) return;
      if (el.dataset.field === "inviteRole") state.inviteRole = el.value;
    });
    tabBar().addEventListener("click", (e) => {
      const tab = e.target.closest("[data-nav]");
      if (!tab) return;
      state.screen = tab.dataset.nav;
      render();
    });
  }

  bind();
  state.speed = Number($("#speedSelect").value) || 2;

  const initial = params.get("scenario") || "happy_path";
  if (SCENARIOS.includes(initial)) {
    $("#scenarioSelect").value = initial;
  }
  // Expose for headless shot scripts
  window.__GG_WIREFRAME__ = {
    getState: () => state,
    loadScenario,
    setScreen: (s) => {
      state.screen = s;
      render();
    },
    setOnboardStep: (n) => {
      state.onboardStep = n;
      state.screen = "onboarding";
      render();
    },
  };
  loadScenario($("#scenarioSelect").value).catch(showLoadError);
})();
