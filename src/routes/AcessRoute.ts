import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { Acess } from '../functions/Acess'

export const AcessRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
        summary: 'Convites para o evento',
        tags: ['Invites'],
        description: 'Esta rota registra o acesso do usuário e o redireciona para o link de inscrição, incluindo o ID do referido como parâmetro "referrer".',
        operationId: 'Acess'
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await Acess({ subscriberId })

      const redirect = new URL(env.WEB)
      redirect.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirect.toString(), 302)
    }
  )
}
