import { defineConfig } from "vite";
import path from "path";

// Vite config for building the embeddable widget
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget/popup-widget.ts"),
      name: "AIbizMateWidget",
      formats: ["iife"],
      fileName: () => "widget.js",
    },
    outDir: "dist-widget",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
