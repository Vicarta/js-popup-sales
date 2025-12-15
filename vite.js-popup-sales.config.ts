import { defineConfig } from "vite";
import path from "path";

// Vite config for building the embeddable popup sales widget
// Build with: npx vite build --config vite.js-popup-sales.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/js-popup-sales/popup-sales.ts"),
      name: "JSPopupSales",
      formats: ["iife"],
      fileName: () => "js-popup-sales",
    },
    outDir: "dist",
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: "js-popup-sales.js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
