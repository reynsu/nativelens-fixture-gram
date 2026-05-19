# nativelens-fixture-gram

Pixly — an Instagram-style React Native host used as a **blind end-to-end eval fixture** for [nativelens](https://github.com/reynsu/nativelens). The app is realistic enough that nativelens has a plausible discovery surface; the bugs inside it are intentional and the answer-key lives outside this repo (see [docs/adr/0001-blind-eval-operating-model.md](docs/adr/0001-blind-eval-operating-model.md)).

## Language

**planted bug**:
A defect introduced on purpose, drawn from the [nativelens diagnostic eval taxonomy](https://github.com/reynsu/nativelens/tree/main/packages/cli/tests/diagnostic-eval/cases) or the 8 a11y rules in [nativelens ADR 0005](https://github.com/reynsu/nativelens/blob/main/docs/adr/0005-a11y-walker-with-eight-rules.md). Indistinguishable in source from an accidental mistake.
_Avoid_: "test bug" (overloaded — nativelens distinguishes test-bug vs real-bug as a diagnosis output).

**answer-key**:
The mapping `(bugId → category, file, expected diagnosis)` for every planted bug. Sealed: lives only in (a) the project owner's Claude memory and (b) `EVAL_ANSWERS.md` listed in `.gitignore`. Never pushed.

**fake-network**:
The in-process `src/lib/fakeApi.ts` module that simulates remote latency via `Promise + setTimeout`. The only "backend" Pixly has. Bugs that rely on async timing (state-desync, navigation-race) need this to fire.

**hydration phase**:
The interval between app boot and the moment `useSession.hydrate()` resolves the persisted session from AsyncStorage. The root layout reads `isLoggedIn` synchronously, so what the user sees during the hydration phase depends on whether the layout waits for `isHydrated`. The current implementation is a deliberate plant; do not "fix" it without updating the answer-key.

**current user**:
The session-owning user in the running app. Pinned to `CURRENT_USER_ID` in `src/data/users.ts`. The login form's typed handle is cosmetic — auth succeeds when the password is ≥ 4 chars and the resulting session is always `CURRENT_USER_ID`.

## Relationships

- The **probe** (added later by `nativelens init`) attaches to React fiber commits inside this app and ships **snapshots** to the dashboard.
- Each interactive element carries a `testID` so the a11y-walker can resolve it to a fiber (per [nativelens ADR 0005](https://github.com/reynsu/nativelens/blob/main/docs/adr/0005-a11y-walker-with-eight-rules.md): elements without `testID` are invisible to v0.1).
- All **planted bugs** must be exercisable by an action a generated Screen Object would take — otherwise nativelens cannot find them.

## Non-negotiables

- No real backend. `src/lib/fakeApi.ts` is the only async source.
- The app must compile cleanly (`npx tsc --noEmit` is green) — TS errors are not bugs we want to test.
- The answer-key never leaves the project owner's machine + memory. Pull requests must not add it to git.
- Fixes for found bugs land in their own commits (one per bug), so the diff makes the bug visible in retrospect.

## Flagged ambiguities

- (none yet)
