import { Plugin } from "rollup"
import { join } from "path"

export type ChangeFrequency 
  = "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"

export type Priority
  = 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1

export interface Url {
  location: string
  lastModified?: Date
  changeFrequency?: ChangeFrequency
  priority?: Priority
}

export interface Options {
  baseUrl: string,
  urls: Array<Url>
}

interface Tag {
  name: string
  children: Array<Tag | null>
}

const dateToYearString = (date: Date): string => {
  return date.getFullYear().toString()
}

const dateToMonthString = (date: Date): string => {
  return (date.getMonth() + 1).toString().padStart(2, "0")
}

const dateToWeekDateString = (date: Date): string => {
  return date.getDate().toString().padStart(2, "0")
}

export const sitemap = (options: Options): Plugin => {
  return {
    name: "sitemap",
    generateBundle() {
      const urlsTag = options.urls.map(url => {
        const locationTag = `<loc>${join(options.baseUrl, url.location)}</loc>`
        const lastModifiedTag = url.lastModified ? `<lastmod>${dateToYearString(url.lastModified)}-${dateToMonthString(url.lastModified)}-${dateToWeekDateString(url.lastModified)}</lastmod>` : ""
        const changeFrequencyTag = url.changeFrequency ? `<changefreq>${url.changeFrequency}</changefreq>` : ""
        const priorityTag = url.priority ? `<priority>${url.priority}</priority>` : ""

        return `<url>${locationTag}${lastModifiedTag}${changeFrequencyTag}${priorityTag}</url>`
      }).join("")

      this.emitFile({
        type: "asset",
        name: "sitemap.xml",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsTag}</urlset>`
      })
    }
  }
}
