#!/usr/bin/env node
/**
 * Guardian Goggles — wireframe mock HTTP API (v0)
 * Serves Data Eng fixtures UNCHANGED from disk.
 * Default: <repo-root>/data/fixtures (override GG_FIXTURES).
 * POST ack mutates in-memory copies only.
 *
 * Aligns with scenario-contract.v0.json v0.2.1:
 * - entitlement on pack is tier string ("free"|"sub"); object lives in household_*.json
 * - alerts[] are top-level on pack; timeline uses field "t"
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 8787);
const FIXTURES =
  process.env.GG_FIXTURES ||
  path.resolve(__dirname, '../../data/fixtures');
/** Fixture clock "today" for free-tier history filter (YYYY-MM-DD). */
const DEMO_DATE = process.env.GG_DEMO_DATE || '2026-09-21';

const CONTRACT_PATH = path.join(FIXTURES, 'scenario-contract.v0.json');
const INDEX_PATH = path.join(FIXTURES, 'index.json');

let contract = null;
let index = null;
/** @type {Map<string, object>} */
const households = new Map();
/** @type {Map<string, object>} disk originals */
const packs = new Map();
/** @type {Map<string, object>} in-memory mutable clones */
const runtime = new Map();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadAll() {
  contract = readJson(CONTRACT_PATH);
  if (fs.existsSync(INDEX_PATH)) {
    try {
      index = readJson(INDEX_PATH);
    } catch (_) {
      index = null;
    }
  }

  households.clear();
  const hhMap = (contract && contract.households) || {
    free: 'household_free.json',
    sub: 'household_sub.json',
  };
  for (const [tier, file] of Object.entries(hhMap)) {
    const full = path.join(FIXTURES, file);
    if (fs.existsSync(full)) {
      households.set(tier, readJson(full));
    }
  }

  packs.clear();
  runtime.clear();

  const scenarioEntries =
    (contract && contract.scenarios) ||
    (index && index.scenarios) ||
    [];

  for (const entry of scenarioEntries) {
    const rel = entry.file || `scenarios/${entry.scenarioId}.json`;
    const full = path.join(FIXTURES, rel);
    const pack = readJson(full);
    const id = pack.scenarioId || entry.scenarioId;
    packs.set(id, pack);
    runtime.set(id, deepClone(pack));
  }
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJson(res, status, body) {
  cors(res);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body, null, 2));
}

function notFound(res, msg) {
  sendJson(res, 404, { error: 'not_found', message: msg || 'Not found' });
}

function badRequest(res, msg) {
  sendJson(res, 400, { error: 'bad_request', message: msg });
}

function getPack(scenarioId) {
  return runtime.get(scenarioId) || null;
}

/** Resolve entitlement object from household file + pack.entitlement tier string. */
function resolveEntitlement(pack) {
  const tier =
    typeof pack.entitlement === 'string'
      ? pack.entitlement
      : pack.entitlement && pack.entitlement.tier;
  const hh = households.get(tier) || null;
  if (hh) {
    return {
      tier: hh.tier,
      maxChildren: hh.maxChildren,
      familySharingEnabled: hh.familySharingEnabled,
      richHistoryEnabled: hh.richHistoryEnabled,
      householdId: hh.householdId,
    };
  }
  // Fallback if household missing but pack already has object
  if (pack.entitlement && typeof pack.entitlement === 'object') {
    return pack.entitlement;
  }
  return {
    tier: tier || 'free',
    maxChildren: tier === 'sub' ? 5 : 1,
    familySharingEnabled: tier === 'sub',
    richHistoryEnabled: tier === 'sub',
  };
}

function demoDateFor(pack) {
  return pack.demoDate || (index && index.demoDateDefault) || DEMO_DATE;
}

/**
 * Alerts from pack.alerts[] (Data Eng top-level).
 * Free tier: only openedAt calendar date == demoDate ("today").
 */
function filterAlerts(pack, { activeOnly = false } = {}) {
  const ent = resolveEntitlement(pack);
  const demoDate = demoDateFor(pack);
  let alerts = Array.isArray(pack.alerts) ? pack.alerts.map((a) => ({ ...a })) : [];

  if (!ent.richHistoryEnabled) {
    alerts = alerts.filter((a) => {
      if (!a.openedAt) return false;
      return String(a.openedAt).slice(0, 10) === demoDate;
    });
  }

  if (activeOnly) {
    alerts = alerts.filter((a) => !a.resolvedAt);
  }
  return alerts;
}

function listScenarios() {
  const entries = (contract && contract.scenarios) || [];
  return entries.map((entry) => {
    const pack = getPack(entry.scenarioId) || packs.get(entry.scenarioId);
    const entitlement = pack ? resolveEntitlement(pack) : { tier: entry.entitlement };
    return {
      scenarioId: entry.scenarioId,
      expectedAlertType: entry.expectedAlertType,
      entitlement,
      alertChildKey: entry.alertChildKey || undefined,
      demoDate: pack ? demoDateFor(pack) : DEMO_DATE,
      title: pack && pack.title,
    };
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function matchRoute(pathname) {
  if (pathname === '/health') return { name: 'health' };
  if (pathname === '/v0/contract') return { name: 'contract' };
  if (pathname === '/v0/scenarios') return { name: 'scenarios' };
  if (pathname === '/v0/reload') return { name: 'reload' };

  let m = pathname.match(/^\/v0\/scenarios\/([^/]+)$/);
  if (m) return { name: 'scenario', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/children$/);
  if (m) return { name: 'children', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/entitlements$/);
  if (m) return { name: 'entitlements', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/alerts\/active$/);
  if (m) return { name: 'alerts_active', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/alerts\/([^/]+)\/ack$/);
  if (m)
    return {
      name: 'alert_ack',
      scenarioId: decodeURIComponent(m[1]),
      alertId: decodeURIComponent(m[2]),
    };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/alerts$/);
  if (m) return { name: 'alerts', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/timeline$/);
  if (m) return { name: 'timeline', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/history$/);
  if (m) return { name: 'history', scenarioId: decodeURIComponent(m[1]) };

  m = pathname.match(/^\/v0\/scenarios\/([^/]+)\/stream$/);
  if (m) return { name: 'stream', scenarioId: decodeURIComponent(m[1]) };

  return null;
}

async function handle(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const host = req.headers.host || `localhost:${PORT}`;
  const url = new URL(req.url || '/', `http://${host}`);
  const route = matchRoute(url.pathname);
  if (!route) return notFound(res, `No route for ${url.pathname}`);

  try {
    switch (route.name) {
      case 'health':
        return sendJson(res, 200, {
          ok: true,
          contractVersion: contract.version,
          fixturesPath: FIXTURES,
          scenariosLoaded: packs.size,
          demoDate: DEMO_DATE,
        });

      case 'contract':
        return sendJson(res, 200, contract);

      case 'scenarios':
        return sendJson(res, 200, {
          contractVersion: contract.version,
          demoDate: DEMO_DATE,
          scenarios: listScenarios(),
        });

      case 'reload': {
        loadAll();
        return sendJson(res, 200, { ok: true, reloaded: packs.size });
      }

      case 'scenario': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        return sendJson(res, 200, {
          ...pack,
          entitlementResolved: resolveEntitlement(pack),
          demoDate: demoDateFor(pack),
        });
      }

      case 'children': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          children: pack.children || [],
        });
      }

      case 'entitlements': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          entitlement: resolveEntitlement(pack),
          entitlementTier: typeof pack.entitlement === 'string' ? pack.entitlement : undefined,
          householdRef: pack.householdRef,
          historyPolicy: contract.historyPolicy,
          demoDate: demoDateFor(pack),
        });
      }

      case 'alerts': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        const ent = resolveEntitlement(pack);
        const alerts = filterAlerts(pack, { activeOnly: false });
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          demoDate: demoDateFor(pack),
          historyFilter: ent.richHistoryEnabled ? 'richHistory' : 'today_only',
          alerts,
        });
      }

      case 'alerts_active': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          alerts: filterAlerts(pack, { activeOnly: true }),
        });
      }

      case 'timeline': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          demoDate: demoDateFor(pack),
          timeline: pack.timeline || [],
        });
      }

      case 'history': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        const ent = resolveEntitlement(pack);
        const demoDate = demoDateFor(pack);
        let history = Array.isArray(pack.history) ? pack.history.slice() : [];
        if (!ent.richHistoryEnabled) {
          history = history.filter((h) => {
            if (h.richOnly) return false;
            if (!h.at) return true;
            return String(h.at).slice(0, 10) === demoDate;
          });
        }
        return sendJson(res, 200, {
          scenarioId: route.scenarioId,
          demoDate,
          historyFilter: ent.richHistoryEnabled ? 'richHistory' : 'today_only',
          history,
        });
      }

      case 'alert_ack': {
        if (req.method !== 'POST') {
          return sendJson(res, 405, { error: 'method_not_allowed', message: 'POST required' });
        }
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        let body;
        try {
          body = await readBody(req);
        } catch (e) {
          return badRequest(res, e.message);
        }
        const ackBy = body.ackBy;
        if (!ackBy || typeof ackBy !== 'string') {
          return badRequest(res, 'Body must include string ackBy');
        }
        if (!Array.isArray(pack.alerts)) {
          return notFound(res, `No alerts array on scenario ${route.scenarioId}`);
        }
        const alert = pack.alerts.find((a) => a.alertId === route.alertId);
        if (!alert) return notFound(res, `Unknown alertId: ${route.alertId}`);
        alert.ackBy = ackBy;
        return sendJson(res, 200, { ...alert });
      }

      case 'stream': {
        const pack = getPack(route.scenarioId);
        if (!pack) return notFound(res, `Unknown scenarioId: ${route.scenarioId}`);
        const intervalMs = Number(url.searchParams.get('intervalMs') || 800);
        cors(res);
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        });
        const events = pack.timeline || [];
        let i = 0;
        res.write(
          `event: meta\ndata: ${JSON.stringify({
            scenarioId: route.scenarioId,
            count: events.length,
            intervalMs,
          })}\n\n`
        );
        const timer = setInterval(() => {
          if (i >= events.length) {
            res.write(`event: done\ndata: ${JSON.stringify({ ok: true })}\n\n`);
            clearInterval(timer);
            res.end();
            return;
          }
          const ev = events[i++];
          res.write(`event: timeline\ndata: ${JSON.stringify(ev)}\n\n`);
        }, intervalMs);
        req.on('close', () => clearInterval(timer));
        return;
      }

      default:
        return notFound(res);
    }
  } catch (err) {
    console.error(err);
    return sendJson(res, 500, { error: 'internal', message: String(err.message || err) });
  }
}

function main() {
  loadAll();
  const server = http.createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error(err);
      sendJson(res, 500, { error: 'internal', message: String(err.message || err) });
    });
  });
  server.listen(PORT, '0.0.0.0', () => {
    console.log(
      `[gg-mock] listening on http://0.0.0.0:${PORT} fixtures=${FIXTURES} contract=${contract.version} scenarios=${packs.size} demoDate=${DEMO_DATE}`
    );
  });
}

main();
