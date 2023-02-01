import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: process.env.CORS,
            methods: ['GET', 'POST']
        }
    });
    await app.listen(process.env.APP_PORT);
}

bootstrap();
