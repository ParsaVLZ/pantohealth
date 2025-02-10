// xray.consumer.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class XRayConsumer {
  private readonly logger = new Logger(XRayConsumer.name);
  @MessagePattern('xray_queue')
  handleXRayData(@Payload() data: any): void {
    this.logger.log(`Received X-Ray data: ${JSON.stringify(data)}`);
  }
}
