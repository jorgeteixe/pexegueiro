import { defineCollection, z } from 'astro:content'

const entradas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    updatedDate: z.date(),
  }),
})

const muinos = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    updatedDate: z.date(),
  }),
})

const entrevistas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    updatedDate: z.date(),
  }),
})

export const collections = {
  entradas: entradas,
  muinos: muinos,
  entrevistas: entrevistas,
}
