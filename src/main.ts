import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FormatRegistry } from '@sinclair/typebox';

FormatRegistry.Set('uri', (value) => {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
});

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();  