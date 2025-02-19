import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
          }),
        },
        summary: 'Inscreva alguém no evento',
        tags: ['Subscription'],
        description: 'Rota para se inscrever ao evento',
      },
    },
    async (request, reply) => {
      const { name, email } = request.body
      return reply.status(201).send({ name })
    }
  )
}
