import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-3:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);

  await app.listen(3000);
}
bootstrap();
