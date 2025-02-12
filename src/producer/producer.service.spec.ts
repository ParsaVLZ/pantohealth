import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ClientProxy } from '@nestjs/microservices';

describe('ProducerService', () => {
  let service: ProducerService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'XRAY_PRODUCER_CLIENT',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    clientProxy = module.get<ClientProxy>('XRAY_PRODUCER_CLIENT');
  });

  it('should send X-ray data', () => {
    const emitSpy = jest.spyOn(clientProxy, 'emit');
    service.sendXRayData({ key: 'value' });
    expect(emitSpy).toHaveBeenCalledWith('xray_queue', { key: 'value' });
  });
});
