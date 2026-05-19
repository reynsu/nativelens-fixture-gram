# Detox + nativelens

This folder contains the Detox jest setup pre-wired with `@reynsu/nativelens-detox-adapter`. The adapter is what tags each end-of-action snapshot with the correct `stepId` so the harness can produce per-step diffs.

## To run

Detox itself is not installed in this repo yet. `nativelens init` added the adapter but did not bootstrap a full Detox project. Before this folder is functional:

```bash
pnpm add -D detox jest @types/jest
npx detox init -r jest          # creates .detoxrc.js, e2e/config.json, e2e/starter.test.ts
```

Then point `.detoxrc.js` at `e2e/jest.setup.ts` as the `setupFilesAfterEach` (or merge with whatever Detox init produced).

## Why the setup file looks the way it does

`@reynsu/nativelens-detox-adapter` exposes:

- `Transport` — WebSocket lifecycle, talks to the nativelens harness at `ws://localhost:7878` by default. Override with `NATIVELENS_HARNESS_URL`.
- `Runner` — wraps Detox's `device` and exposes `step(stepId, fn)`. Calling `step` sends `step:set` to the harness, waits for the probe's `step:ack` (so the React tree is settled), then runs your Detox action.

In specs:

```ts
it("opens the post detail", async () => {
  await step("tap-post-card", async () => {
    await element(by.id("post-p1-header")).tap();
  });
  await expect(element(by.id("post-detail-screen"))).toBeVisible();
});
```

`step` is exposed globally to keep specs terse, matching the canonical Detox style.

## With the nativelens harness running

```bash
nativelens run        # starts harness on :7878, opens dashboard on :7777
detox test            # specs connect via the adapter, snapshots arrive tagged
```
