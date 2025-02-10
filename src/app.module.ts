import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    RabbitMQModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pantohealth'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
