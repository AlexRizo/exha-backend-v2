import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { envs } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Main');

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '2',
  });

  app.use(cookieParser());
  app.enableCors({
    origin: envs.ALLOWED_ORIGINS,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(envs.PORT);

  logger.log(`Application is running on port ${envs.PORT} 🚀`);
}
void bootstrap();
