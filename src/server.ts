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
import { acessRoute } from './routes/acess'
import { subscribeRoute } from './routes/subscibe'

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

app.register(subscribeRoute)
app.register(acessRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('Runing...')
})
