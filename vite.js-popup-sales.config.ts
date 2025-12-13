import { defineConfig } from "vite";
import path from "path";

// Vite config for building the embeddable popup sales widget
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/js-popup-sales/popup-sales.ts"),
      name: "JSPopupSales",
      formats: ["iife"],
      fileName: () => "js-popup-sales.js",
    },
    outDir: "dist-js-popup-sales",
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
