import * as Vitest from "vitest";
import { sitemap } from ".";
import { rollup } from "rollup";

Vitest.describe("sitemap", () => {
  Vitest.test("It should work with only the location", async () => {
    const bundle = await rollup({
      input: "build/index.js",
      plugins: [
        sitemap({
          baseUrl: "https://test.com",
          urls: [
            {
              location: "/"
            }
          ]
        })
      ]
    });

    const { output: outputs } = await bundle.generate({
      format: "esm"
    })

    const sitemapOutput = outputs.find(output => {
      return output.name === "sitemap.xml";
    });

    if (!sitemapOutput) {
      throw new Error("Sitemap not generated");
    }

    if (!("source" in sitemapOutput)) {
      throw new Error("Sitemap not generated");
    }

    Vitest.expect(sitemapOutput.source).toStrictEqual(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https:/test.com/</loc></url></urlset>`);
  });
});
