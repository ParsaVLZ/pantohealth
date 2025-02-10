import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('XRAY_PRODUCER_CLIENT') 
    private readonly client: ClientProxy,
  ) {}

  sendXRayData(data: any) {
    return this.client.emit('xray_queue', data);
  }
}
