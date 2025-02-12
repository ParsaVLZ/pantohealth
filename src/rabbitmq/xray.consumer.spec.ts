import { Test, TestingModule } from '@nestjs/testing';
import { XRayConsumer } from './xray.consumer';
import { SignalsService } from '../signals/signals.service';

describe('XRayConsumer', () => {
  let consumer: XRayConsumer;
  let signalsService: SignalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XRayConsumer,
        {
          provide: SignalsService,
          useValue: {
            processAndSaveXRayData: jest.fn(),
          },
        },
      ],
    }).compile();

    consumer = module.get<XRayConsumer>(XRayConsumer);
    signalsService = module.get<SignalsService>(SignalsService);
  });

  it('should handle x-ray data', async () => {
    const mockData = { deviceId: 'test', time: 12345, data: [] };
    await consumer.handleXRayData(mockData);
    expect(signalsService.processAndSaveXRayData).toHaveBeenCalledWith(mockData);
  });
});
