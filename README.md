# Guardian Goggles

Public repository for Guardian Goggles, a drowning-prevention project.

The default branch `main` is covered by the Main Branch Protections ruleset. That ruleset blocks deletion and force-pushes, requires a pull request (one approval, code owner review, last-push approval, and resolved conversations), and requires the `security-audit` and `frontend-smoke` status checks. Repository admins can bypass those rules.

## Reporting security issues

Report vulnerabilities privately. See [SECURITY.md](SECURITY.md). Do not open a public issue for a suspected vulnerability.

## Secret hygiene

Do not commit secrets, tokens, or private keys. `.gitignore` excludes `.env` files (including `.env.*`), key and certificate material, `node_modules/`, `.venv/`, and common OS metadata files. The `security-audit` workflow runs Gitleaks on every push and pull request. When a lockfile is present, `npm audit` fails that job on high or critical findings. If a secret is committed, revoke it and follow [SECURITY.md](SECURITY.md).
