import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalsModule } from './signals/signals.module';
import { ProducerModule } from './producer/producer.module';
@Module({
  imports: [
    RabbitMQModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pantohealth'),
    SignalsModule,
    ProducerModule
  ]
})
export class AppModule {}
