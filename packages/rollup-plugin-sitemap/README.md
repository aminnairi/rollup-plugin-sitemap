# @aminnairi/rollup-plugin-sitemap

[![npm version](https://img.shields.io/npm/v/@aminnairi/rollup-plugin-sitemap.svg)](https://www.npmjs.com/package/@aminnairi/rollup-plugin-sitemap)
[![types: included](https://img.shields.io/badge/types-included-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/aminnairi/rollup-plugin-sitemap)](<https://codecov.io/gh/aminnairi/rollup-plugin-[![codecov](https://codecov.io/gh/aminnairi/rollup-plugin-sitemap/graph/badge.svg?token=DCCQ6G5HF9)](https://codecov.io/gh/aminnairi/rollup-plugin-sitemap)sitemap>)

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
    format: "esm"
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
    format: "esm"
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
    format: "esm"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://domain.com/about</loc>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://domain.com/contact</loc>
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
    format: "esm"
  }
})
```

```xml
cat build/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://domain.com/about</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://domain.com/contact</loc>
    <priority>1</priority>
  </url>
</urlset>
```

## Configuration with custom path

By default, the sitemap is generated at `sitemap.xml`. You can customize this by using the `path` option:

```javascript
import { defineConfig } from "rollup";
import { sitemap } from "@aminnairi/rollup-plugin-sitemap";

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      path: "subcategory.sitemap.xml",
      urls: [{ location: "/" }],
    }),
  ],
  output: {
    file: "build/index.js",
    format: "esm",
  },
});
```

```xml
cat build/subcategory.sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://domain.com/</loc>
  </url>
</urlset>
```

## Configuration with robots.txt

You can also generate a `robots.txt` file alongside your sitemap using the `robots` option:

```javascript
import { defineConfig } from "rollup";
import { sitemap } from "@aminnairi/rollup-plugin-sitemap";

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [{ location: "/" }],
      robots: {
        sitemap: true,
      },
    }),
  ],
  output: {
    file: "build/index.js",
    format: "esm",
  },
});
```

```txt
cat build/robots.txt
Sitemap: https://domain.com/sitemap.xml
```

### Configuration with robots rules

You can add custom rules to the `robots.txt` file:

```javascript
import { defineConfig } from "rollup";
import { sitemap } from "@aminnairi/rollup-plugin-sitemap";

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [{ location: "/" }],
      robots: {
        sitemap: true,
        rules: [
          {
            description: "Block GPT Bot from indexing",
            userAgent: "GPTBot",
            disallow: "/",
          },
          {
            description: "Allow Google Bot to index everything",
            userAgent: "Googlebot",
            allow: "/",
          },
        ],
      },
    }),
  ],
  output: {
    file: "build/index.js",
    format: "esm",
  },
});
```

```txt
cat build/robots.txt
Sitemap: https://domain.com/sitemap.xml

# Block GPT Bot from indexing
User-Agent: GPTBot
Disallow: /

# Allow Google Bot to index everything
User-Agent: Googlebot
Allow: /
```

## Types

This package exports TypeScript types for advanced configuration:

```typescript
import { defineConfig } from "rollup";
import {
  sitemap,
  type ChangeFrequency,
  type Priority,
  type Url,
  type Robots,
  type RobotsRule,
} from "@aminnairi/rollup-plugin-sitemap";

const changeFrequency: ChangeFrequency = "monthly";
const priority: Priority = 0.8;

const url: Url = {
  location: "/",
  lastModified: new Date(),
  changeFrequency,
  priority,
};

const robotsRule: RobotsRule = {
  description: "Block GPT Bot",
  userAgent: "GPTBot",
  disallow: "/",
};

const robots: Robots = {
  sitemap: true,
  rules: [robotsRule],
};

export default defineConfig({
  input: "index.js",
  plugins: [
    sitemap({
      baseUrl: "https://domain.com",
      urls: [url],
      robots,
    }),
  ],
  output: {
    file: "build/index.js",
    format: "esm",
  },
});
```

### ChangeFrequency

The `ChangeFrequency` type represents how often a page is likely to change. Possible values:

- `"always"` - For pages that change every time they are accessed
- `"hourly"` - For pages that change at least once an hour
- `"daily"` - For pages that change at least once a day
- `"weekly"` - For pages that change at least once a week
- `"monthly"` - For pages that change at least once a month
- `"yearly"` - For pages that change at least once a year
- `"never"` - For archived pages that will never change again

### Priority

The `Priority` type represents the importance of a page relative to other pages on your site. Possible values:

- `0`, `0.1`, `0.2`, `0.3`, `0.4`, `0.5`, `0.6`, `0.7`, `0.8`, `0.9`, `1`

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.1 (2026-03-13)

#### Features

- Added vitest testing framework with 100% code coverage
- Added GitHub Actions workflows:
  - Development workflow (lint + build on `development` branch)
  - Production workflow (lint + test + coverage + build on `production` branch)
- Added badges to README (npm, types, license, codecov)

#### Documentation

- Added testing commands to CONTRIBUTING.md
- Added `test`, `test:watch`, and `test --coverage` scripts

#### Fixes

- Made `userAgent` optional in `RobotsRule` interface

### 1.0.0 (2026-03-13)

#### Breaking changes

- Module format changed from CommonJS to ESM. If you were using CommonJS imports, update your imports to use ESM syntax.
- The sitemap URL in `robots.txt` now includes the sitemap filename (e.g., `Sitemap: https://domain.com/sitemap.xml` instead of `Sitemap: https://domain.com`).

#### Features

- Added `path` option to customize the sitemap filename (e.g., `subcategory.sitemap.xml`)
- Added full `robots.txt` generation support with custom rules including:
  - `description` - Comment describing the rule
  - `userAgent` - Which robot the rule applies to
  - `allow` - URL paths allowed to be indexed
  - `disallow` - URL paths disallowed from indexing
- Added TypeScript type exports (`ChangeFrequency`, `Priority`, `Url`, `Robots`, `RobotsRule`)
- Added `lint` script for TypeScript type checking

#### Fixes

- Fixed module export format to be ESM-compatible

#### Documentation

- Added comprehensive documentation for all new features
- Added TypeScript types documentation
- Updated contributing guidelines

#### License

- Changed from GPL-3.0 to MIT

### 0.1.0

- Initial release
- Basic sitemap generation with `location`, `lastModified`, `changeFrequency`, and `priority` options
- Basic `robots.txt` generation with sitemap URL
