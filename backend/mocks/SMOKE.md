# Mock API smoke results

**When:** 2026-09-21 20:36:45 CT  
**Server:** `node backend/mocks/server.js` → `http://127.0.0.1:8787`  
**Fixtures:** `data/fixtures` (contract **0.2.1**)  
**Result:** **PASS** (`pass=49` `fail=0`)

## Checks
- PASS `GET /health` — {'ok': True, 'contractVersion': '0.2.1', 'fixturesPath': '/workspace/guardian-goggles/data/fixtures', 'scenariosLoaded': 5, 'demoDate': '2026-09-21'}
- PASS `GET /v0/contract` — got 0.2.1
- PASS `contract alertTypes`
- PASS `GET /v0/scenarios` — ['happy_path', 'ble_blip_lt_10s', 'submersion_gt_10s', 'walkaway_lost', 'multi_child_one_alert']
- PASS `scenario happy_path`
- PASS `happy_path entitlementResolved` — {'tier': 'free', 'maxChildren': 1, 'familySharingEnabled': False, 'richHistoryEnabled': False, 'householdId': 'hh_free_demo_01'}
- PASS `happy_path child ch_7a2f9c01`
- PASS `children happy_path`
- PASS `entitlements happy_path`
- PASS `alerts happy_path`
- PASS `timeline happy_path`
- PASS `scenario ble_blip_lt_10s`
- PASS `ble_blip_lt_10s entitlementResolved` — {'tier': 'free', 'maxChildren': 1, 'familySharingEnabled': False, 'richHistoryEnabled': False, 'householdId': 'hh_free_demo_01'}
- PASS `ble_blip_lt_10s child ch_7a2f9c01`
- PASS `children ble_blip_lt_10s`
- PASS `entitlements ble_blip_lt_10s`
- PASS `alerts ble_blip_lt_10s`
- PASS `timeline ble_blip_lt_10s`
- PASS `scenario submersion_gt_10s`
- PASS `submersion_gt_10s entitlementResolved` — {'tier': 'free', 'maxChildren': 1, 'familySharingEnabled': False, 'richHistoryEnabled': False, 'householdId': 'hh_free_demo_01'}
- PASS `submersion_gt_10s child ch_7a2f9c01`
- PASS `children submersion_gt_10s`
- PASS `entitlements submersion_gt_10s`
- PASS `alerts submersion_gt_10s`
- PASS `timeline submersion_gt_10s`
- PASS `scenario walkaway_lost`
- PASS `walkaway_lost entitlementResolved` — {'tier': 'free', 'maxChildren': 1, 'familySharingEnabled': False, 'richHistoryEnabled': False, 'householdId': 'hh_free_demo_01'}
- PASS `walkaway_lost child ch_7a2f9c01`
- PASS `children walkaway_lost`
- PASS `entitlements walkaway_lost`
- PASS `alerts walkaway_lost`
- PASS `timeline walkaway_lost`
- PASS `scenario multi_child_one_alert`
- PASS `multi_child_one_alert entitlementResolved` — {'tier': 'sub', 'maxChildren': 5, 'familySharingEnabled': True, 'richHistoryEnabled': True, 'householdId': 'hh_sub_demo_01'}
- PASS `multi_child_one_alert child ch_a11e4001`
- PASS `multi_child_one_alert child ch_b22f5112`
- PASS `children multi_child_one_alert`
- PASS `entitlements multi_child_one_alert`
- PASS `alerts multi_child_one_alert`
- PASS `timeline multi_child_one_alert`
- PASS `SubmersionSuspect distinct`
- PASS `LostConnection distinct`
- PASS `blip no alert`
- PASS `happy no alert`
- PASS `multi B only`
- PASS `alert fields`
- PASS `POST ack`
- PASS `alerts/active`
- PASS `disk unchanged`

## Curl samples
```bash
curl -s http://127.0.0.1:8787/health
curl -s http://127.0.0.1:8787/v0/scenarios
for s in happy_path ble_blip_lt_10s submersion_gt_10s walkaway_lost multi_child_one_alert; do
  curl -s "http://127.0.0.1:8787/v0/scenarios/$s" | head -c 200; echo
done
curl -s -X POST http://127.0.0.1:8787/v0/scenarios/submersion_gt_10s/alerts/al_sub_9f21/ack \
  -H 'Content-Type: application/json' -d '{"ackBy":"smoke_tester"}'
```

## Notes for Frontend / Data Eng
- Pack `entitlement` is a tier string; `GET .../entitlements` returns the resolved object from `household_*.json` (`tier`, `maxChildren`, `familySharingEnabled`, `richHistoryEnabled`).
- Full pack GET also includes `entitlementResolved` + `demoDate` helpers (disk JSON itself unchanged).
- Free history filter: `demoDate` default `2026-09-21` (`GG_DEMO_DATE`).
- POST ack is **in-memory only** (disk verified unchanged).
- Timeline field is `t` (contract `timelineEventFields`); children may include `sessionActive` / `deviceHealth`.
