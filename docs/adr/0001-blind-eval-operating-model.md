# 0001 — Blind-eval operating model: planted bugs, sealed answer-key, squashed history

**Status**: accepted

## Context

This repo exists to give nativelens a realistic end-to-end host to run against. The 21 micro-fixtures under `packages/cli/tests/diagnostic-eval/cases/` are snapshot-level JSON — they prove the diagnosis classifier works on a single component, but they do not exercise the full nativelens pipeline (`init` → AST detector → Screen Object generation → run → a11y-walker → diagnosis). A full host app is the only way to measure that pipeline.

For the eval to mean anything, two things must be true at the same time:

1. The project owner must not know where the bugs live — otherwise they would unconsciously bias toward catching them.
2. The bugs must be a measurable ground-truth — otherwise "did nativelens find them all?" is unanswerable.

These pull in opposite directions: someone must plant them with intent, and someone must keep the mapping. The owner cannot be both.

Three other constraints shaped the decision:

- The repo will be public. A determined reader could otherwise reverse-engineer planted bugs from `git log`.
- Real users (post-`init`) will fix bugs as nativelens surfaces them. Their fix commits must land cleanly without the answer-key getting in the way.
- The fixture must be usable without persistent Claude memory — a teammate cloning the repo cannot ask Claude to recite secrets.

## Decision

1. **Planting**: bugs are introduced during initial construction by an assistant (Claude) holding the answer-key in working memory, not by the project owner. Categories are drawn from the nativelens eval taxonomy and ADR 0005 a11y rules.

2. **Sealed answer-key**: the mapping `(bugId → category, file, location, expected diagnosis)` is persisted in two places only — Claude's project memory (`/Users/rey/.claude/projects/...`) and `EVAL_ANSWERS.md` in this repo's working tree. `EVAL_ANSWERS.md` is listed in `.gitignore` and must never be committed.

3. **Squashed history**: the initial scaffold lands as a single commit on `main` ("feat: initial Pixly scaffold"). Subsequent commits, including bug fixes, are normal — but a fix commit explicitly identifies which bug it resolves, so reading the post-fix log is a delayed form of disclosure (after the eval already ran), not a pre-disclosure.

4. **Fixes land per bug**: when a bug is found via nativelens and fixed, the fix commit subject line follows `fix(<area>): <one-line>`, body cites the bug id from the answer-key. This makes diff archaeology useful AFTER the eval is run, never before.

## Consequences

- The owner running nativelens against this repo for the first time gets a genuine blind eval. Accuracy numbers are honest.
- A new collaborator can be invited to plant additional bugs without breaking the model, as long as they update the answer-key (Claude memory + gitignored file).
- If Claude memory is lost (`/clear`, etc.), the gitignored file is the only surviving copy. Conversely, if the disk is lost, Claude memory survives.
- Reverting an answered bug requires also reverting the answer-key entry. The "bug → answer-key entry" pair is the atomic unit, not the bug alone.
- The first time the owner runs `nativelens init` followed by `nativelens run`, the result reflects nativelens accuracy on a real host. That number can be compared to the diagnostic-eval micro-fixture accuracy to measure pipeline overhead.

## Alternatives considered

- **Per-bug commits with neutral messages.** Rejected: even with neutral subjects, each commit's diff isolates a single defect. Squash is harder to undo.
- **Private repo.** Rejected: defeats the secondary goal of being a public reference for nativelens users.
- **Natural emergence (no planting).** Rejected: no ground-truth, accuracy unmeasurable.
- **Owner plants their own bugs.** Rejected: the owner cannot unsee the planting and the eval becomes a self-test of memory.
