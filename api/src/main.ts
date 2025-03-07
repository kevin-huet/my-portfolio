import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS,
      methods: ['GET', 'POST', 'DELETE'],
      credentials: true
    },
  });
  await app.listen(process.env.APP_PORT);
}

bootstrap().then();
