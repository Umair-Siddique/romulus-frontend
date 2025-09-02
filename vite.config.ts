import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#assets": path.resolve(__dirname, "src/assets"),
      "#components": path.resolve(__dirname, "src/components"),
      "#context": path.resolve(__dirname, "src/context"),
      "#pages": path.resolve(__dirname, "src/pages"),
      "#providers": path.resolve(__dirname, "src/providers"),
      "#types": path.resolve(__dirname, "src/types"),
      "#lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
