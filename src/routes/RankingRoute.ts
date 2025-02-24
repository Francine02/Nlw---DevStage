import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { Ranking } from '../functions/Ranking'

export const RankingRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/ranking',
    {
      schema: {
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
        summary: 'Retorna o ranking dos usuários com base no número de convites ou cliques.',
        tags: ['Ranking'],
        description: 'Esta rota retorna a lista de usuários ordenados pelo número de convites ou cliques registrados no sistema.',
      },
    },
    async request => {
      const { rankingWithScore } = await Ranking()
      return { ranking: rankingWithScore }
    }
  )
}
