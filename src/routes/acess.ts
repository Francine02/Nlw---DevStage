import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { acess } from '../functions/acess'

export const acessRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
        summary: 'Convites para o evento',
        tags: ['Invites'],
        description: 'Rota para acessar o link e redirecionar o usuário',
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await acess({ subscriberId })

      const redirect = new URL(env.WEB)
      redirect.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirect.toString(), 302)
    }
  )
}
