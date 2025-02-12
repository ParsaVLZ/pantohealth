import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignalsService } from '../signals/signals.service';

@ApiTags('RabbitMQ Consumer')
@Controller()
export class XRayConsumer {
  private readonly logger = new Logger(XRayConsumer.name);
  constructor(private signalsService: SignalsService) {}

  @MessagePattern('xray_queue')
  @ApiOperation({ summary: 'Consumes incoming x-ray data from RabbitMQ' })
  async handleXRayData(@Payload() data: any) {
    try {
      this.logger.log(`Received X-Ray data: ${JSON.stringify(data)}`);
      await this.signalsService.processAndSaveXRayData(data);
    } catch (error) {
      this.logger.error('Error processing X-ray data:', error);
    }
  }
}
