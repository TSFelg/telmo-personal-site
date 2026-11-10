import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      hideToc: z.boolean().optional(),
      // An empty value means "not set", so the site timezone applies.
      timezone: z
        .string()
        .optional()
        .transform(tz => tz || undefined),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const httpUrl = z
  .url()
  .refine(value => /^https?:\/\//.test(value), "Use an http or https URL");
const resourceUrl = z.union([
  httpUrl,
  z
    .string()
    .regex(/^\/(?!\/)[^\s]*$/, "Use a site-relative path starting with /"),
]);
const optionalLink = resourceUrl.optional().or(z.literal(""));

const talks = defineCollection({
  loader: file("data/talks.yaml"),
  schema: z.object({
    title: z.string().min(1),
    event: z.string().min(1),
    date: z.coerce.date(),
    event_url: httpUrl.optional().or(z.literal("")),
    slides: optionalLink,
    video: optionalLink,
    post: optionalLink,
    kind: z.enum(["talk", "podcast", "panel", "workshop"]).default("talk"),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, pages, talks };
