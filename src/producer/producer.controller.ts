import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('simulate')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('xray')
  sendXRay(@Body() xrayData: any) {
    this.producerService.sendXRayData(xrayData);
    return { status: 'OK', message: 'X-ray data sent.' };
  }
}
