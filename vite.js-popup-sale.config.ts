import { defineConfig } from "vite";
import path from "path";

// Vite config for building the embeddable popup sale widget
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/js-popup-sale/popup-sale.ts"),
      name: "JSPopupSale",
      formats: ["iife"],
      fileName: () => "js-popup-sale.js",
    },
    outDir: "dist-js-popup-sale",
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
