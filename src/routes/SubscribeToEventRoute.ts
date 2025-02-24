import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { Subscribe } from '../functions/Subscribe'

export const SubscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referral: z.string().optional()
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
      const { name, email, referral } = request.body

      const { subscriberId } = await Subscribe({
        name,
        email,
        referral: referral
      })
      return reply.status(201).send({ subscriberId })
    }
  )
}
