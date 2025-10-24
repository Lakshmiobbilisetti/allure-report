import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"], // your setup file
    reporters: [
      "default", // keeps normal console output
      [
        "allure-vitest/reporter", // Allure reporter
        {
          resultsDir: "allure-results", // folder where Allure results are saved
          useCucumberStepReporter: false, // optional, can enable if using Cucumber
        },
      ],
    ],
  },
});
