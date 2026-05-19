/// <reference types="detox" />
import {
  closeNativelens,
  setTest,
  setupNativelens,
  step,
} from "@reynsu/nativelens-detox-adapter";

declare global {
  // eslint-disable-next-line no-var
  var step: typeof step;
}

beforeAll(async () => {
  await setupNativelens({
    harnessUrl: process.env.NATIVELENS_HARNESS_URL ?? "ws://localhost:7878",
    device,
  });
});

afterAll(async () => {
  await closeNativelens();
});

beforeEach(() => {
  const fullName =
    (globalThis as { jasmine?: { currentTest?: { fullName?: string } } }).jasmine?.currentTest
      ?.fullName ?? expect.getState().currentTestName ?? "unknown";
  setTest(fullName ?? "unknown");
});

(globalThis as unknown as { step: typeof step }).step = step;
