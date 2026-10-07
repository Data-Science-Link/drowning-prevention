# Guardian Goggles

**Parent-facing wearable + phone app — an honest, session-aware backup signal for residential pools.**  
A rechargeable BLE sensor clips onto a child's swim goggles. The parent's phone alerts when signal is lost *during an active Pool Session* — a low-cost, transparent layer of protection for backyard pools.

> **Current stage:** docs + CI foundation complete. Stage 0 wireframe next (#10). See [`notes/STATUS.md`](notes/STATUS.md).

**This is a public-service open-handoff project.** The software architecture, research, and UX model are open. If you can build the hardware and ship this, please do — see [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](docs/PUBLIC_SERVICE_AND_CAPITAL.md) for the full handoff overview and a ~$100K exploration path.

The default branch `main` is covered by the Main Branch Protections ruleset. That ruleset blocks deletion and force-pushes, requires a pull request (one approval, code owner review, last-push approval, and resolved conversations), and requires the `security-audit` status check. Repository admins can bypass those rules.

CI reports `frontend-smoke` on every push and pull request so it can be required beside `security-audit`.

---

## What it is / isn't

| It is | It is not |
|---|---|
| A BLE-based session-aware alert layer | A drowning detector |
| A backup signal for parents at poolside | A replacement for active supervision |
| Two distinct alert states (see below) | A guarantee of safety |
| Affordable hardware (~$150–250 kit ASP) | A medical device |

### Alert philosophy

Water kills 2.4 GHz BLE signal in centimetres. Signal loss alone is **not** a drowning diagnosis — dry scenarios (phone walked away, play dunks, battery) produce the same reading. Guardian Goggles ships two honest states:

- **Lost Connection** (blue/amber) — BLE signal gone; cause unknown; check on the child.
- **SubmersionSuspect** (red) — signal gone *during* a Pool Session *plus* a second cue (wetness sensor, IMU anomaly). Still not certainty; still act now.

Copy never says "drowning." Free core alerts are never gated behind a subscription.

---

## Repository layout

```
docs/           Design, architecture, and standing decisions
notes/          Living working notes (STATUS, OPEN_QUESTIONS)
frontend/       UI — next PR brings HTML wireframe; eventual GitHub Pages site
backend/        Services — next PR brings mock API
data/           Fixtures and simulated datasets
strategy/       Market, legal, business-case docs (selectively migrated)
science/        BLE / power / sensor research
finance/        Unit-economics models
product/        Feature maps, user stories
src/            Python package (guardian_goggles)
tests/          Pytest suite
.github/        CI, Dependabot, Pages workflow
```

See [`docs/REPO_LAYOUT.md`](docs/REPO_LAYOUT.md) for the full annotated map.

---

## Contributing

1. Fork or branch from `main`.
2. Open a pull request against `main` — branch names must follow `cursor/<slug>` or `feat/<slug>` conventions enforced by the ruleset.
3. All PRs require passing CI (`security-audit`, `frontend-smoke`) before merge.
4. See [`docs/DEV.md`](docs/DEV.md) for local setup.

---

## Quick start (Python / UV)

```bash
# Install uv if you don't have it
curl -Lsf https://astral.sh/uv/install.sh | sh

# Install deps and enter the environment
uv sync

# Run tests
uv run pytest
```

---

## Security

Report vulnerabilities privately. See [`SECURITY.md`](SECURITY.md). Do not open a public issue for a suspected vulnerability.

### Secret hygiene

Do not commit secrets, tokens, or private keys. `.gitignore` excludes `.env` files (including `.env.*`), key and certificate material, `node_modules/`, `.venv/`, and common OS metadata files. The `security-audit` workflow runs Gitleaks on every push and pull request. When a lockfile is present, `npm audit` fails that job on high or critical findings. If a secret is committed, revoke it and follow [`SECURITY.md`](SECURITY.md).

---

## GitHub Pages

The `frontend/` site will be deployed via GitHub Actions to GitHub Pages.  
**Manual step required:** in repo **Settings → Pages**, set *Source* to **GitHub Actions**.  
Once set, pushes to `main` auto-deploy the static site. The current placeholder page is live at the Pages URL once that setting is enabled.

---

## Docs

Full design docs live in [`docs/`](docs/):

- [Purpose & problem](docs/PURPOSE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Repository layout](docs/REPO_LAYOUT.md)
- [Standing decisions](docs/DECISIONS.md) — D-001…D-007 (locked choices; open a PR to change)
- [Dev setup](docs/DEV.md)
- [Public service & capital handoff](docs/PUBLIC_SERVICE_AND_CAPITAL.md) — problem overview, what exists, ~$100K exploration path, kill criteria, how to contribute or fork

Living notes: [`notes/STATUS.md`](notes/STATUS.md) · [`notes/OPEN_QUESTIONS.md`](notes/OPEN_QUESTIONS.md)

Open issues: [#9 public-service framing](https://github.com/Data-Science-Link/drowning-prevention/issues/9) · [#10 wireframe](https://github.com/Data-Science-Link/drowning-prevention/issues/10) · [#14 HW PoC](https://github.com/Data-Science-Link/drowning-prevention/issues/14)
