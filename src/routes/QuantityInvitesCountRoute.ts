import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { QuantityInvitesCount } from '../functions/QuantityInvitesCount'

export const QuantityInvitesCountRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions/:subscriberId/ranking/count',
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
        summary: 'Retorna o número de convidados que o usuário convidou',
        tags: ['Quantity Invites'],
        description: 'Esta rota calcula a quantidade de convidados cadastrados usando o link de um usuário específico.',
      },
    },
    async (request) => {
      const { subscriberId } = request.params

      const { count } = await QuantityInvitesCount({ subscriberId })

      return { count }
    }
  )
}
