import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  // TODO: Replace with your project ref from https://cloud.trigger.dev
  project: "proj_REPLACE_ME",

  // Where task files are located
  dirs: ["./trigger"],

  // Runtime configuration
  runtime: "node",

  // Build configuration
  build: {
    // External packages that shouldn't be bundled
    external: [],
  },

  // Max duration for tasks (in seconds) - can be overridden per-task
  maxDuration: 600,
});
