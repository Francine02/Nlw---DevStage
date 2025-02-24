import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform, //Formato dos dados
  serializerCompiler,
  validatorCompiler, //Transforma os dados ao enviar pro front
} from 'fastify-type-provider-zod'
import { env } from './env'
import { AcessRoute } from './routes/AcessRoute'
import { QuantityInviteRoute } from './routes/QuantityInvitesRoute'
import { SubscribeToEventRoute } from './routes/SubscribeToEventRoute'
import { QuantityInvitesCountRoute } from './routes/QuantityInvitesCountRoute'
import { SubscriberRankingPositionRoute } from './routes/SubscriberRankingPositionRoute'
import { RankingRoute } from './routes/RankingRoute'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true, //Vou deixar assim mesmo, ja que não irei fazer o front
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nlw Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(SubscribeToEventRoute)
app.register(AcessRoute)
app.register(QuantityInviteRoute)
app.register(QuantityInvitesCountRoute)
app.register(SubscriberRankingPositionRoute)
app.register(RankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('Runing...')
})
