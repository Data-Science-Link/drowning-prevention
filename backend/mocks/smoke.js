#!/usr/bin/env node
/**
 * Pool Safety Monitor mock API — in-process smoke test.
 * Loads fixtures, starts the server on an ephemeral port, probes key endpoints,
 * then exits 0 (pass) or 1 (fail). Zero extra deps.
 *
 * Usage:  node smoke.js
 *         GG_FIXTURES=../../data/fixtures node smoke.js
 */
'use strict';

process.env.PORT = '0'; // ephemeral port

const http = require('http');
const path = require('path');

// ── Force fixtures path relative to this file so the script works from any cwd ──
if (!process.env.GG_FIXTURES) {
  process.env.GG_FIXTURES = path.resolve(__dirname, '../../data/fixtures');
}

// ── Inline the server module (avoid spawning a child process) ──
// We need the server's http.Server object so we can query its assigned port.
// server.js calls main() on load; patch createServer to capture it.
const origCreate = http.createServer.bind(http);
let capturedServer = null;
http.createServer = (...args) => {
  capturedServer = origCreate(...args);
  return capturedServer;
};

require('./server');

// Restore
http.createServer = origCreate;

// ── Wait for the server to be listening ──
function waitListen(srv, ms = 5000) {
  return new Promise((resolve, reject) => {
    if (srv.listening) return resolve();
    const t = setTimeout(() => reject(new Error('server did not start in time')), ms);
    srv.once('listening', () => { clearTimeout(t); resolve(); });
    srv.once('error', (e) => { clearTimeout(t); reject(e); });
  });
}

async function get(port, urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}${urlPath}`, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(Buffer.concat(chunks).toString()) });
        } catch (e) {
          reject(new Error(`JSON parse failed for ${urlPath}: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(4000, () => { req.destroy(); reject(new Error(`timeout ${urlPath}`)); });
  });
}

async function post(port, urlPath, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = http.request(
      { hostname: '127.0.0.1', port, path: urlPath, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(Buffer.concat(chunks).toString()) });
          } catch (e) {
            reject(new Error(`JSON parse failed for POST ${urlPath}: ${e.message}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(4000, () => { req.destroy(); reject(new Error(`timeout POST ${urlPath}`)); });
    req.write(body);
    req.end();
  });
}

let pass = 0;
let fail = 0;

function check(label, cond, detail = '') {
  if (cond) {
    console.log(`  PASS  ${label}`);
    pass++;
  } else {
    console.error(`  FAIL  ${label}${detail ? ' — ' + detail : ''}`);
    fail++;
  }
}

const SCENARIOS = [
  'happy_path',
  'ble_blip_lt_10s',
  'submersion_gt_10s',
  'walkaway_lost',
  'multi_child_one_alert',
];

async function run() {
  await waitListen(capturedServer);
  const port = capturedServer.address().port;
  console.log(`[smoke] server on port ${port} — running checks…\n`);

  // /health
  const h = await get(port, '/health');
  check('/health 200', h.status === 200);
  check('/health ok=true', h.body.ok === true);
  check('/health contractVersion present', typeof h.body.contractVersion === 'string');
  check('/health scenariosLoaded=5', h.body.scenariosLoaded === 5, String(h.body.scenariosLoaded));

  // /v0/scenarios
  const sl = await get(port, '/v0/scenarios');
  check('/v0/scenarios 200', sl.status === 200);
  const ids = (sl.body.scenarios || []).map((s) => s.scenarioId);
  check('/v0/scenarios all 5 present', SCENARIOS.every((s) => ids.includes(s)), ids.join(','));

  // /v0/contract
  const ct = await get(port, '/v0/contract');
  check('/v0/contract 200', ct.status === 200);
  check('/v0/contract alertTypes', Array.isArray(ct.body.alertTypes), String(ct.body.alertTypes));
  check(
    '/v0/contract SubmersionSuspect + LostConnection distinct',
    ct.body.alertTypes &&
      ct.body.alertTypes.includes('SubmersionSuspect') &&
      ct.body.alertTypes.includes('LostConnection') &&
      ct.body.alertTypes.length >= 2
  );

  // Per-scenario spot checks
  for (const sid of SCENARIOS) {
    const sp = await get(port, `/v0/scenarios/${sid}`);
    check(`/v0/scenarios/${sid} 200`, sp.status === 200);
    check(`/v0/scenarios/${sid} entitlementResolved`, sp.body.entitlementResolved != null);

    const al = await get(port, `/v0/scenarios/${sid}/alerts`);
    check(`/v0/scenarios/${sid}/alerts 200`, al.status === 200);

    const tl = await get(port, `/v0/scenarios/${sid}/timeline`);
    check(`/v0/scenarios/${sid}/timeline 200`, tl.status === 200);
  }

  // Alert-type honesty: submersion_gt_10s must have SubmersionSuspect, not LostConnection
  const sub = await get(port, '/v0/scenarios/submersion_gt_10s/alerts');
  const subTypes = (sub.body.alerts || []).map((a) => a.type);
  check('submersion_gt_10s alert type=SubmersionSuspect', subTypes.includes('SubmersionSuspect'));
  check('submersion_gt_10s no LostConnection', !subTypes.includes('LostConnection'));

  // walkaway_lost must have LostConnection, not SubmersionSuspect
  const wa = await get(port, '/v0/scenarios/walkaway_lost/alerts');
  const waTypes = (wa.body.alerts || []).map((a) => a.type);
  check('walkaway_lost alert type=LostConnection', waTypes.includes('LostConnection'));
  check('walkaway_lost no SubmersionSuspect', !waTypes.includes('SubmersionSuspect'));

  // happy_path and ble_blip_lt_10s must have no alerts
  const hp = await get(port, '/v0/scenarios/happy_path/alerts');
  check('happy_path no alerts', (hp.body.alerts || []).length === 0);
  const blip = await get(port, '/v0/scenarios/ble_blip_lt_10s/alerts');
  check('ble_blip_lt_10s no alerts', (blip.body.alerts || []).length === 0);

  // POST ack (in-memory)
  const ack = await post(
    port,
    '/v0/scenarios/submersion_gt_10s/alerts/al_sub_9f21/ack',
    { ackBy: 'smoke_tester' }
  );
  check('POST ack 200', ack.status === 200);
  check('POST ack ackBy set', ack.body.ackBy === 'smoke_tester');

  // 404 on unknown scenario
  const nf = await get(port, '/v0/scenarios/does_not_exist');
  check('unknown scenario 404', nf.status === 404);

  console.log(`\n[smoke] pass=${pass} fail=${fail}`);
  capturedServer.close();
  process.exit(fail > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('[smoke] fatal:', err.message);
  process.exit(1);
});
