import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Trello-clone/",
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "build",
  },
});
