import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages:
// If your repository is https://github.com/TU_USUARIO/rl-home-reformas
// use "/rl-home-reformas/".
// If you use a custom domain, change base to "/".
export default defineConfig({
  plugins: [react()],
  base: "/rl-home-reformas/",
});