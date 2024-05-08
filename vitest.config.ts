import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import magicalSvg from 'vite-plugin-magical-svg'
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsConfigPaths(), magicalSvg({ target: "react"})],
  test: {
    environment: "jsdom",
    setupFiles: ["vitest-setup.tsx"],
    coverage: {
      provider: "v8",
      extension: [".tsx", ".ts"],
      exclude: ["next-env.d.ts"],
    },
    globals: true,
  },
});
