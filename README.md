# Telmo’s personal site

A light-only, text-first personal site built with [Astro](https://astro.build) and [AstroPaper](https://github.com/satnaing/astro-paper). Talks come first; blog posts can be added when ready. No demo talks or posts are published. The typography uses self-hosted Vollkorn, with a warm paper background and dark red links inspired by [LJ Miranda’s site](https://ljvmiranda921.github.io/).

## Local development

Use Node.js 24 (the tested version is in `.node-version`) and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Astro. To inspect search, build first: Pagefind generates its index during the production build.

```sh
pnpm test
pnpm build
pnpm preview
```

The build runs Astro’s TypeScript checks, generates the site and search index, and verifies required pages, internal links, the light theme, and exclusion of the bundled drafts. Dependencies are locked in `pnpm-lock.yaml`.

## Add a talk

Edit `data/talks.yaml`. Replace the bundled draft, or append another entry:

```yaml
- id: an-example-talk
  title: "Your talk title"
  event: "Event name"
  date: 2026-11-09
  kind: talk
  draft: false
  event_url: "https://example.com/event"
  slides: "/slides/your-talk.pdf"
  video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
  post: "/posts/your-write-up/"
```

Every entry needs a unique `id`, title, event, and date. Optional links can be omitted or left empty. Remove the example links you do not have. Dates sort newest first and are grouped by year. `kind` accepts `talk`, `panel`, `workshop`, or `podcast`. Set `draft: true` to keep an entry off the site.

Put slide PDFs in `public/slides/`. Use paths such as `/slides/your-talk.pdf`; the site adds its deployment prefix automatically. External slide URLs also work. YAML fields are validated at build time, and broken local links fail the build.

## Add a post

Copy `src/content/posts/first-post.md` to a new Markdown filename. Set the title, description, `pubDatetime`, tags, and body, then set `draft: false`. Keep the bundled template as a draft or remove it once you have another post. Published posts automatically appear in the homepage feed, Posts, Archive, Tags, RSS, and search.

## Personal details

- Site name, description, timezone, social links: `astro-paper.config.ts`.
- Introduction: `src/pages/index.astro`.
- About page: `src/content/pages/about.md`.
- Small visual customizations: `src/styles/personal.css` and `src/styles/theme.css`.

No employer, biography, contact address, or social profile is guessed. Add those when ready. A future CV can go in `public/` and be linked from the About page.

## GitHub Pages

The repository is `TSFelg/tsfelg.github.io` and the default URL is `https://tsfelg.github.io/`.

In the repository’s **Settings → Pages**, set the source to **GitHub Actions**. The deploy workflow builds and publishes every push to `main`. CI also checks pull requests and verifies both the root URL and a subdirectory configuration. Build output, dependencies, local credentials, and environment files are not committed.

## Custom domain

Change `site.url` in `astro-paper.config.ts` to your domain, including a trailing slash. Astro derives the base path from that URL. Set the custom domain in GitHub Pages settings and configure its DNS following [GitHub’s instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

You can verify the root-domain build without editing the config:

```sh
SITE_URL=https://example.com/ pnpm build
```

## Project history

The initial commit imports AstroPaper 7.1.0. Subsequent commits separate the personal-site features from repository checks and deployment. The theme’s MIT license is retained in `LICENSE`.
