import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 4000;

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact('Nicole Moreira', 'https://github.com/NicoleMdaSilva', 'nicole.moreira9004@gmail.com')
  .setVersion('1.0') //Primeiro numero é mudanças consideraveis ao sistema, segundo é mudanças e correções mas nada grandioso, terceiro é hot fix (bugs que incomodam mas não quebra o sistema)
  .addBearerAuth()
  .build(); //Builder executa a documentação e guarda na váriavel config
  const document = SwaggerModule.createDocument(app, config) //Documentação
  SwaggerModule.setup('/swagger', app, document);
  

  process.env.TZ = '-3:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || port);
}
bootstrap();
