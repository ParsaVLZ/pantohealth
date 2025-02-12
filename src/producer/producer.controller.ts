import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Producer')
@Controller('simulate')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('xray')
  @ApiOperation({ summary: 'Send simulated x-ray data' })
  @ApiBody({ description: 'X-ray data payload', schema: { example: {
    "66bb584d4ae73e488c30a072": {
      "data": [
        [762, [51.339764, 12.339223833333334, 1.2038]],
        [1766, [51.33977733333333, 12.339211833333334, 1.531604]]
      ],
      "time": 1735683480000
    }
  }
  } 
})
  @ApiResponse({ status: 201, description: 'X-ray data sent successfully' })
  sendXRay(@Body() xrayData: any) {
    this.producerService.sendXRayData(xrayData);
    return { status: 'OK', message: 'X-ray data sent.' };
  }
}
