import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { SubscriberRankingPosition } from '../functions/SubscriberRankingPosition'

export const SubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.post(
      '/subscriptions/:subscriberId/ranking/position',
      {
        schema: {
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
          summary: 'Retorna a posição no ranking',
          tags: ['Ranking'],
          description: 'Esta rota calcula a posição de um usuário no ranking com base no número de convites ou cliques',
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await SubscriberRankingPosition({ subscriberId })
        return { position }
      }
    )
  }
