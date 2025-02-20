import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribe } from '../functions/subscribe'

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
            subscriberId: z.string(),
          }),
        },
        summary: 'Inscreva alguém no evento',
        tags: ['Subscription'],
        description: 'Rota para se inscrever ao evento',
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribe({
        name,
        email,
      })
      return reply.status(201).send({ subscriberId })
    }
  )
}
