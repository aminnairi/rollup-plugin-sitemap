import { defineConfig } from "rollup";
import { sitemap } from "@aminnairi/rollup-plugin-sitemap";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "index.js",
  plugins: [
    nodeResolve(),
    sitemap({
      path: "sitemap.sub.xml",
      baseUrl: "https://amin.nairi.cloud",
      urls: [
        {
          location: "/"
        }
      ],
      robots: {
        sitemap: true,
        rules: [
          {
            description: "Prevent this site from being indexed",
            disallow: "/",
            userAgent: "*"
          }
        ]
      }
    })
  ],
  output: {
    file: "dist/index.js"
  }
});
