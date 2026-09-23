import { defineConfig } from "vite";

export default defineConfig({
  base: "/rsschool-landing-page/",

  build: {
    minify: false,
    sourcemap: true,
  },
  input: {
    main: "index.html",
    menu: "menu.html",
  },
  css: {
    devSourcemap: true,
  },
});
