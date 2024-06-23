import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.log('port ' + process.env.PORT);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Payroll API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'Header',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  const port = process.env.PORT || 8080;
  app.enableCors();

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
