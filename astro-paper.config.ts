import { defineAstroPaperConfig } from "./src/types/config";

// Change this URL to move the site to a custom domain.
export default defineAstroPaperConfig({
  site: {
    url: process.env.SITE_URL ?? "https://tsfelg.github.io/",
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
  // Add other public profiles here. RSS is included by the Socials component.
  socials: [
    {
      name: "github",
      url: "https://github.com/TSFelg",
      linkTitle: "GitHub",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/telmo-felgueira/",
      linkTitle: "LinkedIn",
    },
    {
      name: "scholar",
      url: "https://scholar.google.com/citations?user=WBahNhkAAAAJ&hl=pt-PT",
      linkTitle: "Google Scholar",
    },
    {
      name: "goodreads",
      url: "https://www.goodreads.com/user/show/20064238",
      linkTitle: "Goodreads",
    },
  ],
  shareLinks: [],
});
