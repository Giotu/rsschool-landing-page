import { defineConfig } from "vite";

export default defineConfig({
  base: "/rsschool-landing-page/",

  build: {
    sourcemap: true,
  },

  css: {
    devSourcemap: true,
  },
});
