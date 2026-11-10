import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = "dist";
for (const route of [
  "index.html",
  "talks/index.html",
  "posts/index.html",
  "about/index.html",
  "archives/index.html",
  "tags/index.html",
  "search/index.html",
  "rss.xml",
  "sitemap-index.xml",
  "pagefind/pagefind.js",
]) {
  assert(existsSync(join(root, route)), `Missing build output: ${route}`);
}
const home = readFileSync(join(root, "index.html"), "utf8");
const canonical = home.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
assert(canonical, "Homepage must have a canonical URL");
const site = new URL(canonical[1]);
const base = site.pathname.replace(/\/$/, "");
const files = readdirSync(root, { recursive: true }).filter(file =>
  file.endsWith(".html")
);
let checked = 0;
for (const file of files) {
  const html = readFileSync(join(root, file), "utf8");
  assert(html.includes('data-theme="light"'), `${file} is not light-only`);
  assert(!html.includes('id="theme-btn"'), `${file} exposes a theme toggle`);
  assert(
    !html.includes("Your talk title") && !html.includes("Your first post"),
    `${file} leaks draft content`
  );
  const fontPreloads = [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*>/g)]
    .map(([tag]) => tag)
    .filter(tag => tag.includes('as="font"'));
  assert(fontPreloads.length > 0, `${file}: critical fonts are not preloaded`);
  assert(
    fontPreloads.every(tag => tag.includes('type="font/woff2"')),
    `${file}: font preloads must use WOFF2`
  );
  assert(
    !html.includes('format("truetype")'),
    `${file}: build-only TrueType fonts leaked into page CSS`
  );
  const pagePath =
    file === "index.html" ? "" : file.replace(/index\.html$/, "");
  const page = new URL(pagePath, site);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (/^(?:data:|mailto:|tel:|#)/.test(raw)) continue;
    const url = new URL(raw, page);
    if (url.origin !== site.origin) continue;
    assert(
      url.pathname === base || url.pathname.startsWith(base + "/"),
      `${file}: link escapes site base: ${raw}`
    );
    const local = decodeURIComponent(url.pathname.slice(base.length)).replace(
      /^\//,
      ""
    );
    const target = join(root, local);
    assert(
      existsSync(target) || existsSync(join(target, "index.html")),
      `${file}: missing local target: ${raw}`
    );
    checked++;
  }
}
console.log(
  `Verified ${files.length} pages and ${checked} internal references at ${site.href}`
);
