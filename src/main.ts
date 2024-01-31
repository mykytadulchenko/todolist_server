import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 3030
  const app = await NestFactory.create(AppModule, {
    cors: {
      exposedHeaders: ['Authorization'],
    },
  })
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder().setTitle('Todolist back-end').setDescription('Rest API docs').setVersion('1.0.0').build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

bootstrap()
