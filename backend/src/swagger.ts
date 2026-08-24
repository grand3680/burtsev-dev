import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

/** Единая конфигурация OpenAPI-документа (используется и сервером, и генератором openapi.json). */
export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Burtsev Dev API')
    .setDescription('REST-зеркало GraphQL-контрактов сайта-визитки Кирилла Бурцева')
    .setVersion('0.1.0')
    .addTag('experience')
    .addTag('skill')
    .addTag('contact')
    .addTag('health')
    .build()

  return SwaggerModule.createDocument(app, config)
}
