import { Plugin } from "rollup";

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type Priority =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;

export interface Url {
  /**
   * Location of the page to index
   * @example sitemap({ urls: [ { location: "/" } ] })
   */
  location: string;
  /**
   * Date this page has been last modified
   * @example sitemap({ urls: [ { lastModified: new Date(2026, 2, 13) } ] })
   */
  lastModified?: Date;
  /**
   * Frequency of change for this page
   * @example sitemap({ urls: [ { frequency: "monthly" } ] })
   */
  changeFrequency?: ChangeFrequency;
  /**
   * Priority of this page in the indexation
   * @example sitemap({ urls: [ { priority: 1 } ] })
   */
  priority?: Priority;
}

export interface RobotsRule {
  /**
   * Description that will be added as a comment
   * @default ""
   * @example sitemap({ robots: { rules: [ { description: "This will prevent GPT Bot from indexing" } ] } })
   */
  description?: string;
  /**
   * URL that the robot is allowed to index
   * @default ""
   * @example sitemap({ robots: { rules: [ { allow: "/" } ] } })
   */
  allow?: string
  /**
   * URL that the robot is disallowed to index
   * @default ""
   * @example sitemap({ robots: { rules: [ { disallow: "/" } ] } })
   */
  disallow?: string
  /**
   * Robots matching this user agent will be allowed to execute this rule
   * @example sitemap({ robots: { rules: [ { userAgent: "GPTBot" } ] } })
   */
  userAgent: string
}

export interface Robots {
  /**
   * Whether to include the URL of the generated sitemap in the robots.txt file.
   * @example sitemap({ robots: { sitemap: true } })
   */
  sitemap?: boolean
  /**
   * Rules like allow, disallow or user agent.
   * @example sitemap({ robots: { rules: [] } })
   */
  rules?: RobotsRule[]
}

export interface Options {
  /**
   * Path for this sitemap
   * @default sitemap.xml
   * @example sitemap({ path: "subcategory.sitemap.xml" })
   */
  path?: string;
  /**
   * Base URL for the site that is described by the sitemap.
   * @example sitemap({ baseUrl: "https://amin.nairi.cloud" })
   */
  baseUrl: string;
  /**
   * Public URLs that this sitemap should point to.
   * @example sitemap({ urls: [] })
   */
  urls: Array<Url>;
  /**
   * Whether this plugin should also generate a sitemap or not.
   * @example sitemap({ robots: {} })
   */
  robots?: Robots
}

const dateToYearString = (date: Date): string => {
  return date.getFullYear().toString();
};

const dateToMonthString = (date: Date): string => {
  return (date.getMonth() + 1).toString().padStart(2, "0");
};

const dateToWeekDateString = (date: Date): string => {
  return date.getDate().toString().padStart(2, "0");
};

/**
 * Generate a sitemap.xml file and optionally a robots.txt file.
 * @example sitemap({ baseUrl: "https://amin.nairi.cloud", urls: [] })
 */
export const sitemap = (options: Options): Plugin => {
  return {
    name: "sitemap",
    generateBundle() {
      const baseUrl =
        options.baseUrl.at(-1) === "/"
          ? options.baseUrl
          : options.baseUrl + "/";

      const urlsTag = options.urls
        .map((url) => {
          const location =
            url.location[0] === "/" ? url.location.slice(1) : url.location;

          const locationTag = `<loc>${baseUrl}${location}</loc>`;

          const lastModifiedTag = url.lastModified
            ? `<lastmod>${dateToYearString(
              url.lastModified
            )}-${dateToMonthString(url.lastModified)}-${dateToWeekDateString(
              url.lastModified
            )}</lastmod>`
            : "";

          const changeFrequencyTag = url.changeFrequency
            ? `<changefreq>${url.changeFrequency}</changefreq>`
            : "";

          const priorityTag = url.priority
            ? `<priority>${url.priority}</priority>`
            : "";

          return `<url>${locationTag}${lastModifiedTag}${changeFrequencyTag}${priorityTag}</url>`;
        })
        .join("");

      const fileName = options.path ?? "sitemap.xml";

      this.emitFile({
        type: "asset",
        name: "Sitemap",
        fileName,
        source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsTag}</urlset>`,
      });

      if (options.robots) {
        const sitemapLine = options.robots.sitemap ? `Sitemap: ${options.baseUrl}/${fileName}` : "";

        const rulesLines = options.robots?.rules?.map(rule => {
          const descriptionLine = rule.description ? `# ${rule.description}` : "";
          const allowLine = rule.allow ? `Allow: ${rule.allow}` : "";
          const disallowLine = rule.disallow ? `Disallow: ${rule.disallow}` : "";
          const userAgentLine = `User-Agent: ${rule.userAgent}`;

          return [
            descriptionLine,
            userAgentLine,
            disallowLine,
            allowLine
          ].filter(Boolean).join("\n");
        }) ?? [];

        const rulesLine = rulesLines.join("\n\n");

        const source = [
          sitemapLine,
          rulesLine,
        ].filter(Boolean).join("\n\n");

        this.emitFile({
          type: "asset",
          name: "Robots",
          fileName: "robots.txt",
          source
        });
      }
    },
  };
};
