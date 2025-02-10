import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignalsService } from 'src/signals/signals.service';

@Controller()
export class XRayConsumer {
  private readonly logger = new Logger(XRayConsumer.name);
  constructor(private signalsService: SignalsService) {}

  @MessagePattern('xray_queue')
  async handleXRayData(@Payload() data: any) {
    try {
      this.logger.log(`Received X-Ray data: ${JSON.stringify(data)}`);
      await this.signalsService.processAndSaveXRayData(data);
    } catch (error) {
      this.logger.error('Error processing X-ray data:', error);
    }
  }
}
