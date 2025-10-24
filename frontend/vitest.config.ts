import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@' points to frontend/src
    },
  },
  test: {
    globals: true, // use it, describe, expect globally
    environment: "jsdom", // simulate browser for component tests
    setupFiles: ["./src/setupTests.ts"], // your global setup
    reporters: [
      "default", // normal console output
      [
        "allure-vitest/reporter", // Allure reporter
        {
          resultsDir: "allure-results", // output directory for JSON results
          useCucumberStepReporter: false, // optional
        },
      ],
    ],
  },
});
