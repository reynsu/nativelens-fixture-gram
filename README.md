# Pixly — nativelens fixture

A small Instagram-style React Native app used as a **blind end-to-end eval fixture** for [nativelens](https://github.com/reynsu/nativelens).

This app is intentionally imperfect. It contains a known number of planted bugs — both real host bugs and accessibility violations — drawn from the nativelens diagnostic eval taxonomy. The mapping from bug to location lives outside this repo; if you don't already have it, you don't get it.

If you stumble on this from a search and you're looking for a polished social app, this isn't it.

## Stack

- Expo SDK 54 + Expo Router (file-based)
- TypeScript (strict)
- Zustand for state, `@react-native-async-storage/async-storage` for session
- All "remote" calls simulated by `src/lib/fakeApi.ts` (Promise + setTimeout)
- iOS-first, Hermes (aligned with [nativelens ADR 0003](https://github.com/reynsu/nativelens/blob/main/docs/adr/0003-ios-first-hermes-only.md))

## What's in the app

Six screens: Feed, Post Detail (with comments), DM List, DM Thread, Profile, Auth/Login. One pinned current user (`u1` in `src/data/users.ts`). Twelve seeded posts, three seeded conversations.

Every interactive element carries a `testID`. The probe is **not** wired up — that happens when you run `nativelens init` against this repo.

## Running it

```bash
pnpm install
pnpm ios       # boots simulator
```

## Running nativelens against it

```bash
# from this repo's root, after pnpm install
npx @reynsu/nativelens-cli init
nativelens run
nativelens diagnose <runId> <testId>   # for each failure
```

If you have the sealed answer-key, compare the diagnoses to the expected categories to measure pipeline accuracy.

## Documentation

- [CONTEXT.md](CONTEXT.md) — glossary
- [docs/adr/0001-blind-eval-operating-model.md](docs/adr/0001-blind-eval-operating-model.md) — why the bugs are planted and how the answer-key is sealed

## License

MIT
