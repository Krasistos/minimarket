import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: 'http://localhost:4001', // Frontend is running on port 4001
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  
  const config = new DocumentBuilder()
    .setTitle('Minimarket API')
    .setDescription('API for managing products, inventory, and orders')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(new ValidationPipe());

  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);

  Logger.log(`🚀 App is running at: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
export default bootstrap;
