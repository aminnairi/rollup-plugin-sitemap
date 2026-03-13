import { describe, it, expect, vi, beforeEach } from "vitest";
import { sitemap } from "./index";

describe("sitemap", () => {
  let mockEmitFile: ReturnType<typeof vi.fn>;
  let mockContext: any;

  beforeEach(() => {
    mockEmitFile = vi.fn();
    mockContext = {
      emitFile: mockEmitFile
    };
  });

  it("should generate a sitemap with a single URL", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "asset",
        fileName: "sitemap.xml",
        source: expect.stringContaining("<loc>https://example.com/</loc>")
      })
    );
  });

  it("should generate a sitemap with multiple URLs", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [
        { location: "/" },
        { location: "/about" },
        { location: "/contact" }
      ]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    const emittedFile = mockEmitFile.mock.calls[0]?.[0];
    expect(emittedFile?.fileName).toBe("sitemap.xml");
    expect(emittedFile?.source).toContain("<loc>https://example.com/</loc>");
    expect(emittedFile?.source).toContain("<loc>https://example.com/about</loc>");
    expect(emittedFile?.source).toContain("<loc>https://example.com/contact</loc>");
  });

  it("should handle URLs with leading slashes", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/about" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<loc>https://example.com/about</loc>")
      })
    );
  });

  it("should handle URLs without leading slashes", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "about" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<loc>https://example.com/about</loc>")
      })
    );
  });

  it("should include lastModified in the sitemap", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/", lastModified: new Date("2026-03-13") }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<lastmod>2026-03-13</lastmod>")
      })
    );
  });

  it("should include changeFrequency in the sitemap", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/", changeFrequency: "daily" as const }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<changefreq>daily</changefreq>")
      })
    );
  });

  it("should include priority in the sitemap", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/", priority: 1 as const }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<priority>1</priority>")
      })
    );
  });

  it("should use custom path when provided", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      path: "custom-sitemap.xml",
      urls: [{ location: "/" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "custom-sitemap.xml"
      })
    );
  });

  it("should generate robots.txt with sitemap URL", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }],
      robots: { sitemap: true }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "robots.txt",
        source: expect.stringContaining("Sitemap: https://example.com/sitemap.xml")
      })
    );
  });

  it("should generate robots.txt with custom sitemap path", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      path: "custom-sitemap.xml",
      urls: [{ location: "/" }],
      robots: { sitemap: true }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "robots.txt",
        source: expect.stringContaining("Sitemap: https://example.com/custom-sitemap.xml")
      })
    );
  });

  it("should generate robots.txt with rules", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }],
      robots: {
        sitemap: true,
        rules: [
          {
            userAgent: "GPTBot",
            disallow: "/"
          }
        ]
      }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    const emittedFile = mockEmitFile.mock.calls.find((call: any[]) => call[0]?.fileName === "robots.txt")?.[0];
    expect(emittedFile?.fileName).toBe("robots.txt");
    expect(emittedFile?.source).toContain("User-Agent: GPTBot");
    expect(emittedFile?.source).toContain("Disallow: /");
  });

  it("should generate robots.txt with rule description", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }],
      robots: {
        rules: [
          {
            description: "Block GPT Bot",
            userAgent: "GPTBot",
            disallow: "/"
          }
        ]
      }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "robots.txt",
        source: expect.stringContaining("# Block GPT Bot")
      })
    );
  });

  it("should generate robots.txt with allow rule", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }],
      robots: {
        rules: [
          {
            userAgent: "Googlebot",
            allow: "/"
          }
        ]
      }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    const emittedFile = mockEmitFile.mock.calls.find((call: any[]) => call[0]?.fileName === "robots.txt")?.[0];
    expect(emittedFile?.fileName).toBe("robots.txt");
    expect(emittedFile?.source).toContain("Allow: /");
  });

  it("should handle missing userAgent in robots rules", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }],
      robots: {
        rules: [
          {
            allow: "/"
          }
        ]
      }
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    const emittedFile = mockEmitFile.mock.calls.find((call: any[]) => call[0]?.fileName === "robots.txt")?.[0];
    expect(emittedFile?.fileName).toBe("robots.txt");
    expect(emittedFile?.source).not.toContain("User-Agent:");
  });

  it("should handle baseUrl without trailing slash", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com",
      urls: [{ location: "/" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<loc>https://example.com/</loc>")
      })
    );
  });

  it("should handle baseUrl with trailing slash", () => {
    const plugin = sitemap({
      baseUrl: "https://example.com/",
      urls: [{ location: "/" }]
    });

    // @ts-expect-error - generateBundle is private but we need to call it
    plugin.generateBundle.call(mockContext);

    expect(mockEmitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        source: expect.stringContaining("<loc>https://example.com/</loc>")
      })
    );
  });
});
