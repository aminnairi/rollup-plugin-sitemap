# @aminnairi/rollup-plugin-sitemap

Sitemap generator

## Installation

```bash
npm install rollup @aminnairi/rollup-plugin-sitemap
touch rollup.config.js
```

## Configuration

```javascript
import { defineConfig } from "rollup"
import { sitemap } from "@aminnairi/rollup-plugin-sitemap"

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [
        { location: "/" },
        { location: "/about" }
        { location: "/contact" }
      ]
    })
  ],
  output: {
    file: "build/index.js",
    format: "cjs"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
  </url>
  <url>
    <loc>https://domain.com/about</loc>
  </url>
  <url>
    <loc>https://domain.com/contact</loc>
  </url>
</urlset>
```

## Configuration with last modification

```javascript
import { defineConfig } from "rollup"
import { sitemap } from "@aminnairi/rollup-plugin-sitemap"

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [
        {
          location: "/",
          lastModified: new Date()
        },
        {
          location: "/about",
          lastModified: new Date()
        }
        {
          location: "/contact",
          lastModified: new Date()
        }
      ]
    })
  ],
  output: {
    file: "build/index.js",
    format: "cjs"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
    <lastmod>2022-09-09</lastmod>
  </url>
  <url>
    <loc>https://domain.com/about</loc>
    <lastmod>2022-09-09</lastmod>
  </url>
  <url>
    <loc>https://domain.com/contact</loc>
    <lastmod>2022-09-09</lastmod>
  </url>
</urlset>
```

## Configuration with change frequency

```javascript
import { defineConfig } from "rollup"
import { sitemap } from "@aminnairi/rollup-plugin-sitemap"

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [
        {
          location: "/",
          changeFrequency: "monthly"
        },
        {
          location: "/about",
          changeFrequency: "monthly"
        }
        {
          location: "/contact",
          changeFrequency: "monthly"
        }
      ]
    })
  ],
  output: {
    file: "build/index.js",
    format: "cjs"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https:/domain.com/</loc>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https:/domain.com/about</loc>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https:/domain.com/contact</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

## Configuration with priority

```javascript
import { defineConfig } from "rollup"
import { sitemap } from "@aminnairi/rollup-plugin-sitemap"

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [
        {
          location: "/",
          priority: 1
        },
        {
          location: "/about",
          priority: 1
        }
        {
          location: "/contact",
          priority: 1
        }
      ]
    })
  ],
  output: {
    file: "build/index.js",
    format: "cjs"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https:/domain.com/</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>https:/domain.com/about</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>https:/domain.com/contact</loc>
    <priority>1</priority>
  </url>
</urlset>
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

See [`LICENSE`](./LICENSE).
