import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'xray_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('PANTOHealth IOT API')
    .setDescription('API for processing x-ray data from IOT devices')
    .setVersion('1.0')
    .addTag('signals')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('App is running on http://localhost:3000');
  console.log('Swagger Documentation on http://localhost:3000/api');
}

bootstrap();
