import { Test, TestingModule } from '@nestjs/testing';
import { SignalsController } from './signals.controller';
import { SignalsService } from './signals.service';
import { CreateXRayDto } from './dto/create-xray.dto';

describe('SignalsController', () => {
  let controller: SignalsController;
  let signalsService: jest.Mocked<SignalsService>;

  const createXRayDto: CreateXRayDto = {
    deviceId: '66bb584d4ae73e488c30a072',
    time: 1735683480000,
    dataLength: 3,
    rawData: {
        coordinates: [51.339764, 12.339223833333334],
        speed: 1.2038,  
      },
  };

  const mockSignalsService: Partial<Record<keyof SignalsService, jest.Mock>> = {
    findAll: jest.fn().mockResolvedValue([createXRayDto]),
    findById: jest.fn().mockImplementation((id) =>
      Promise.resolve({ _id: id, ...createXRayDto })
    ),
    createSignal: jest.fn().mockImplementation((dto) =>
      Promise.resolve({ _id: 'a1111', ...dto })
    ),
    updateSignal: jest.fn().mockImplementation((id, updateDto) =>
      Promise.resolve({ _id: id, ...updateDto })
    ),
    deleteSignal: jest.fn().mockResolvedValue(true),
    filterSignals: jest.fn().mockResolvedValue([createXRayDto]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalsController],
      providers: [
        {
          provide: SignalsService,
          useValue: mockSignalsService,
        },
      ],
    }).compile();

    controller = module.get<SignalsController>(SignalsController);
    signalsService = module.get(SignalsService);
  });

  it('should return all signals', async () => {
    const result = await controller.getAllSignals();
    expect(result).toEqual([createXRayDto]);
    expect(signalsService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return one signal by ID', async () => {
    const id = '123';
    const result = await controller.getOne(id);
    expect(result).toEqual({ _id: id, ...createXRayDto });
    expect(signalsService.findById).toHaveBeenCalledWith(id);
  });

  it('should create a signal', async () => {
    const result = await controller.create(createXRayDto);
    expect(result).toEqual({ _id: 'a1111', ...createXRayDto });
    expect(signalsService.createSignal).toHaveBeenCalledWith(createXRayDto);
  });

  it('should update a signal', async () => {
    const id = 'a1111';
    const updateDto = { dataLength: 100, rawData: {
        coordinates: [51.339764, 12.339223833333334],
        speed: 1.2038,  
      },
    };
    const result = await controller.update(id, updateDto);
    expect(result).toEqual({ _id: id, ...updateDto });
    expect(signalsService.updateSignal).toHaveBeenCalledWith(id, updateDto);
  });

  it('should delete a signal', async () => {
    const id = 'a1111';
    const result = await controller.remove(id);
    expect(result).toBe(true);
    expect(signalsService.deleteSignal).toHaveBeenCalledWith(id);
  });
});
