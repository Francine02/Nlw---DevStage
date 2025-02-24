import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { QuantityInvites } from '../functions/QuantityInvites'

export const QuantityInviteRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions/:subscriberId/ranking/click',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
        summary: 'Retorna o número de cliques no link de convite.',
        tags: ['Quantity Invites'],
        description: 'Esta rota calcula quantas vezes o link de convite de um usuário foi clicado.',
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      const { count } = await QuantityInvites({ subscriberId })

      return { count }
    }
  )
}
