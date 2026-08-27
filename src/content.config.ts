import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const link = z.object({ label: z.string(), url: z.string().url(), description: z.string().optional() });
const image = z.object({ src: z.string(), alt: z.string().default('') });
const posts = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/posts' }),
  schema: z.object({
    path: z.string(), title: z.string(), description: z.string(),
    category: z.enum(['traducoes', 'mods', 'ports', 'analises']), section: z.string().default(''),
    author: z.string().default('Wolff'), date: z.coerce.date(), cover: z.string(), platform: z.string().default('PS Vita'),
    status: z.string().optional(), tags: z.array(z.string()).default([]), featured: z.boolean().default(false), draft: z.boolean().default(false),
    presentation: z.array(z.string()).default([]),
    game: z.object({ title: z.string(), developer: z.string().default(''), publisher: z.string().default(''), genre: z.string().default(''), release: z.string().default(''), titleId: z.string().default(''), version: z.string().default(''), language: z.string().default('') }),
    projectLogo: z.string().optional(), projectIntro: z.array(z.string()).default([]), credits: z.array(z.string()).default([]), thanks: z.array(z.string()).default([]), observations: z.array(z.string()).default([]),
    extras: z.array(z.object({ title: z.string(), text: z.string(), image: z.string().optional() })).default([]),
    progress: z.array(z.object({ label: z.string(), percent: z.number().min(0).max(100), detail: z.string().optional() })).default([]),
    gallery: z.array(image).default([]), installation: z.array(z.string()).default([]), installationNotes: z.array(z.string()).default([]),
    downloads: z.array(link).default([]), tools: z.array(link).default([])
  })
});
export const collections = { posts };
