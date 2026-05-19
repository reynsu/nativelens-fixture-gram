# Agent instructions for this repo

This is a **blind-eval fixture for [nativelens](https://github.com/reynsu/nativelens)**. The application code is intentionally imperfect.

## Before touching code

1. Read [CONTEXT.md](CONTEXT.md) for the glossary.
2. Read [docs/adr/0001-blind-eval-operating-model.md](docs/adr/0001-blind-eval-operating-model.md) for *why* this repo exists and what "intentional" means here.
3. If you see something that looks like a bug — **do not silently fix it**. It is most likely planted. Confirm with the owner first.

## Doing work

- Use Expo SDK 54 docs at https://docs.expo.dev/versions/v54.0.0/.
- `pnpm` is the package manager.
- TypeScript must stay green: `npx tsc --noEmit`.
- Every interactive element needs a `testID`. The a11y-walker is blind to elements without one (see [nativelens ADR 0005](https://github.com/reynsu/nativelens/blob/main/docs/adr/0005-a11y-walker-with-eight-rules.md)).
- Never add `EVAL_ANSWERS.md` to git. It is the sealed answer-key.

## Fixing a planted bug

If nativelens surfaced a bug and the owner confirmed the fix:

- One commit per bug.
- Subject: `fix(<area>): <one-line>`.
- Body cites the bug id from `EVAL_ANSWERS.md` and the diagnosis run that found it.
