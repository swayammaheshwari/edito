import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "EditoSDK",
      fileName: "index"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tiptap/react",
        "@tiptap/pm",
        "@tiptap/core",
        "@tiptap/starter-kit",
        "@tiptap/extension-collaboration",
        "@tiptap/extension-collaboration-cursor",
        "@hocuspocus/provider",
        "y-prosemirror",
        "yjs"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        }
      }
    }
  },
  plugins: [dts()]
});