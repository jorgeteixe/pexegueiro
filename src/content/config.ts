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
    ubicacion: z.string(),
    lugar: z.string(),
    coordenadas: z.array(z.string()),
    tipoloxia: z.string(),
    propiedade: z.string(),
    estado: z.string(),
    enUsoAta: z.date().optional(),
    outrosNomes: z.string().optional(),
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
