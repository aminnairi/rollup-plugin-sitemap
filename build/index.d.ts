import { Plugin } from "rollup";
export declare type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
export declare type Priority = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export interface Url {
    location: string;
    lastModified?: Date;
    changeFrequency?: ChangeFrequency;
    priority?: Priority;
}
export interface Options {
    baseUrl: string;
    urls: Array<Url>;
}
export declare const sitemap: (options: Options) => Plugin;
