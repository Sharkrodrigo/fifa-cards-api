import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('FIFA Cards API')
    .setDescription('API para gerenciamento de cards de jogadores de futebol')
    .setVersion('1.0')
    .addTag('players')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
