import { defineAstroPaperConfig } from "./src/types/config";

// Change this URL to move the site to a custom domain.
export default defineAstroPaperConfig({
  site: {
    url:
      process.env.SITE_URL ?? "https://tsfelg.github.io/telmo-personal-site/",
    title: "Telmo",
    description: "Talks, slides and technical notes by Telmo.",
    author: "Telmo",
    lang: "en",
    timezone: "Europe/Lisbon",
    dir: "ltr",
  },
  posts: { perPage: 10, perIndex: 4 },
  features: {
    lightAndDarkMode: false,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
    toc: true,
  },
  // Add your GitHub, LinkedIn or email links here when ready.
  socials: [],
  shareLinks: [],
});
