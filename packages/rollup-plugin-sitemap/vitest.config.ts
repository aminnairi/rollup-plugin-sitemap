import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["sources/**/*.test.ts"],
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["sources/**/*.ts"],
      exclude: ["sources/**/*.test.ts"]
    }
  }
});
