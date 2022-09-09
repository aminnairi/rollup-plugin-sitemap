'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');

const dateToYearString = (date) => {
    return date.getFullYear().toString();
};
const dateToMonthString = (date) => {
    return (date.getMonth() + 1).toString().padStart(2, "0");
};
const dateToWeekDateString = (date) => {
    return date.getDate().toString().padStart(2, "0");
};
const sitemap = (options) => {
    return {
        name: "sitemap",
        generateBundle() {
            const urlsTag = options.urls.map(url => {
                const locationTag = `<loc>${path.join(options.baseUrl, url.location)}</loc>`;
                const lastModifiedTag = url.lastModified ? `<lastmod>${dateToYearString(url.lastModified)}-${dateToMonthString(url.lastModified)}-${dateToWeekDateString(url.lastModified)}</lastmod>` : "";
                const changeFrequencyTag = url.changeFrequency ? `<changefreq>${url.changeFrequency}</changefreq>` : "";
                const priorityTag = url.priority ? `<priority>${url.priority}</priority>` : "";
                return `<url>${locationTag}${lastModifiedTag}${changeFrequencyTag}${priorityTag}</url>`;
            }).join("");
            this.emitFile({
                type: "asset",
                name: "sitemap.xml",
                fileName: "sitemap.xml",
                source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsTag}</urlset>`
            });
        }
    };
};

exports.sitemap = sitemap;
