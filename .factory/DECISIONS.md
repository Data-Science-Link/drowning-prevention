# Decision log

Append-only. Newest at the bottom.

## Template

```
### YYYY-MM-DD — Short title
- **Decision:** what we chose
- **Why:** one or two sentences
- **Alternatives:** what we rejected (optional)
- **Revisit when:** trigger to reconsider (optional)
```

## Log

### 2026-10-06 — Factory layout
- **Decision:** Ship a copy-paste `.factory/` template: `FACTORY.md`, `DECISIONS.md`, `DOCS.md`, `skills/`
- **Why:** Portable across repos and models; process separate from product docs
- **Alternatives:** Root-level files only; heavyweight monorepo factory infra
- **Revisit when:** A target repo already uses `.factory` for something else

### 2026-10-06 — GitHub issues as sole intake
- **Decision:** Factory work = GitHub issues only. CoS chat files issues; open issues start the loop when a watcher/agent picks them up.
- **Why:** Durable, multiplayer, pick-uppable; history out of chat
- **Alternatives:** Chat-as-queue; external tracker as primary
- **Revisit when:** Need a label/filter so not every issue enters the factory

### 2026-10-06 — Coordinator message kicks the production line
- **Decision:** A message to the project coordinator (CoS or similar) is a factory trigger: file/refine a GitHub issue, then hand off to the factory worker (`intake-from-coordinator.md`). Renamed skill from intake-from-cos.
- **Why:** Stakeholder chat should start the line, not only create a dormant issue; still issue-first and multiplayer.
- **Alternatives:** CoS files issue and always stops; chat-as-queue with no GitHub issue.
- **Revisit when:** A project uses labels so only some coordinator asks enter the factory.

### 2026-10-07 — Adopted factory layout in this repo
- **Decision:** Added `.factory/` (FACTORY.md, DECISIONS.md, DOCS.md, skills/) at repo root.
- **Why:** Establishes a portable, model-agnostic process playbook; work items tracked via GitHub issues.
- **Alternatives:** None evaluated; repo is greenfield with no prior process convention.
- **Revisit when:** A README, docs/, or CI config is added — update DOCS.md pointers accordingly.

### 2026-10-07 — Correction: this repo is not greenfield; DOCS.md and role boundaries updated
- **Decision:** Updated `.factory/DOCS.md` to point at real existing paths (README.md, docs/PURPOSE.md, docs/ARCHITECTURE.md, docs/REPO_LAYOUT.md, docs/DEV.md, docs/DECISIONS.md, notes/STATUS.md, notes/OPEN_QUESTIONS.md, SECURITY.md, tests/, pyproject.toml, .github/workflows/, and area READMEs). The prior adoption note was wrong to describe the repo as greenfield.
- **Why:** The repo already had full docs, CI, tests, and open issues (merged in from main). DOCS.md must reflect reality so agents can navigate without guessing.
- **Role boundary:** Product/technical ADRs (D-001 … D-007) live in `docs/DECISIONS.md` and are the product source of truth. `.factory/DECISIONS.md` records factory-process decisions only (how we run the loop, intake, coordination). Agents must not conflate the two files.
- **Revisit when:** New top-level docs are added — append rows to DOCS.md rather than editing this entry.

### 2026-10-07 — Liability gates + contributor sketches
- **Decision:** Add `skills/liability-gates.md` and portable sketches (`CONTRIBUTING.md`, PR template, CODEOWNERS example) under `.factory/sketches/`. Factory-loop must follow liability-gates. Not legal advice; does not eliminate liability.
- **Why:** Light-review public factories need machine-readable hard stops (secrets, license, CI, over-claims) and copy-paste diligence artifacts.
- **Alternatives:** Repo-only ad hoc docs; no agent-enforced gates.
- **Revisit when:** Counsel provides project-specific terms, or CLA is chosen over DCO.

### 2026-10-07 — Always sync latest main before factory work
- **Decision:** Factory skills require fetching/updating onto the current default branch before branching or continuing work; cloud agents may have a slightly stale main.
- **Why:** Avoid PRs based on outdated tips and painful rebase conflicts.
- **Alternatives:** Hope the agent environment is fresh; only sync when conflicts appear.
- **Revisit when:** Agent harnesses guarantee up-to-date default branch at start.
