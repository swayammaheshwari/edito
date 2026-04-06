import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "EditoSDK",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});