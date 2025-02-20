import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3030), //Converte para number -> coerce
  POSTGRES_SQL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB: z.string().url(),
})

export const env = envSchema.parse(process.env)
