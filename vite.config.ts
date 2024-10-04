import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, InlineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    //usar variáveis globais
    globals: true,
    //define onde está importado o plugin jest-dom
    setupFiles: "./test/setup.ts",
    environment: "happy-dom",
  },
  //reescrevendo o tipo desse objeto, pra aceitar a parte de testes
} as UserConfig & {
  test: InlineConfig;
});
