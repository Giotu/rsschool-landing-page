import { defineConfig } from "vite";

export default defineConfig({
  base: "/rsschool-landing-page/",

  build: {
    minify: false,
    sourcemap: true,
  },

  css: {
    devSourcemap: true,
  },
});
