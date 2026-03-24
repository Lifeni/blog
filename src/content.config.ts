import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/文章',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      subtitle: z.string().optional(),
      id: z.string(),
      cover: z
        .object({
          description: z.string(),
          path: image(),
        })
        .optional(),
      license: z.string(),
      tags: z.array(z.string()),
      date: z.object({
        created: z.date(),
        updated: z.date(),
      }),
      draft: z.boolean().optional(),
      archived: z.boolean().optional(),
      featured: z.boolean().optional(),
      pinned: z.boolean().optional(),
    }),
})

const stories = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/专题',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      subtitle: z.string().optional(),
      id: z.string(),
      cover: z.object({
        description: z.string(),
        path: image(),
      }),
      license: z.string(),
      tags: z.array(z.string()),
      date: z.object({
        created: z.date(),
        updated: z.date(),
      }),
      draft: z.boolean().optional(),
      articles: z.array(z.string()).optional(),
    }),
})

const archives = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/存档',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    name: z.string(),
    'create-date': z.date(),
    date: z.date(),
    license: z.string(),
  }),
})

export const collections = {
  文章: articles,
  专题: stories,
  存档: archives,
}
