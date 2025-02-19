import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3030) //Converte para number -> coerce
})

export const env = envSchema.parse(process.env);