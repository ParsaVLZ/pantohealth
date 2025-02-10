import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { XRayConsumer } from './xray.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'XRAY_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'xray_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [XRayConsumer],
  providers: [],
})
export class RabbitMQModule {}
