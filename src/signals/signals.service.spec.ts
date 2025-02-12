import { Test, TestingModule } from '@nestjs/testing';
import { SignalsService } from './signals.service';
import { getModelToken } from '@nestjs/mongoose';
import { XRay } from './schemas/xray.schema';
import { Model } from 'mongoose';

describe('SignalsService', () => {
  let service: SignalsService;
  let model: Model<XRay>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        {
          provide: getModelToken(XRay.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
    model = module.get<Model<XRay>>(getModelToken(XRay.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process and save X-ray data', async () => {
    const mockData = {
      "device1": {
        "data": [[1644, [44.4, 10.4, 1.4]]],
        "time": 240000000,
      },
    };
    const saveSpy = jest.spyOn(model, 'create').mockResolvedValue([mockData] as any);
    await service.processAndSaveXRayData(mockData);
    expect(saveSpy).toHaveBeenCalled();
  });
});
