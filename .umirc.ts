import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", },
    { path: "/amappg", component: "amappg" },
    { path: '/pdfpg', component: 'pdfpg'}
  ],
  npmClient: 'pnpm',
});
