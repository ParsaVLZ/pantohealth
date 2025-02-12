import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateXRayDto {
  @ApiProperty({ example: 'device1', description: 'The ID of the device' })
  @IsString()
  deviceId: string;

  @ApiProperty({ example: 1735683480000, description: 'Timestamp of the x-ray data' })
  @IsNumber()
  time: number;

  @ApiProperty({ example: 3, description: 'Length of the data array' })
  @IsNumber()
  dataLength: number;

  @ApiProperty({ example: 500, description: 'Size of the data in bytes' })
  @IsNumber()
  @IsOptional()
  dataVolume?: number;

  @ApiProperty({
    example: { 
      data: [
        [762, [51.339764, 12.339223833333334, 1.2038]],
        [1766, [51.33977733333333, 12.339211833333334, 1.531604]]
      ],
      time: 1735683480000
    },
    description: 'Raw x-ray data from the device, including coordinates and speed',
    type: 'object',
  })
  @IsObject()
  rawData: any;
}

export class UpdateXRayDto extends PartialType(CreateXRayDto) {}