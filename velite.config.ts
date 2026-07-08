import { defineConfig, defineCollection, s } from "velite";

const localized = s.object({ en: s.string(), uk: s.string() });

const works = defineCollection({
  name: "Work",
  pattern: "works/**/*.md",
  schema: s
    .object({
      title: localized,
      firstWord: localized,
      type: localized,
      typesofwork: localized,
      technologies: s.string(),
      platform: s.enum(["mobile", "web"]),
      // Absent for confidential/NDA projects (mobile apps with nothing public
      // to link to) — those render a case card instead of an external link.
      link: s.string().url().optional(),
      role: localized.optional(),
      description: localized.optional(),
      responsibilities: s
        .object({ en: s.array(s.string()), uk: s.array(s.string()) })
        .optional(),
      image: s.string(),
      order: s.number().default(0),
      path: s.path(),
    })
    .transform(({ path, ...rest }) => ({
      ...rest,
      slug: path.replace(/^works\//, ""),
    })),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      cover: s.string().optional(),
      draft: s.boolean().default(false),
      path: s.path(),
      content: s.mdx(),
      excerpt: s.excerpt(),
    })
    .transform(({ path, ...rest }) => {
      const slug = path.replace(/^blog\//, "");
      return { ...rest, slug, url: `/blog/${slug}` };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { works, posts },
});
