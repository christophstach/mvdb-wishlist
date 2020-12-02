import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const address = '0.0.0.0';
  const port = parseInt(process.env.PORT, 10) || 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Book store api')
    .setDescription('Query books from the book store api.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  Logger.log(
    `Nest application starts listening on ${address}:${port}`,
    'Bootstrap',
  );
  await app.listen(port, address);
}

bootstrap();
