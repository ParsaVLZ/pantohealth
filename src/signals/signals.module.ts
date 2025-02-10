import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XRay, XRaySchema } from './schemas/xray.schema';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XRaySchema }]),
  ],
  providers: [SignalsService],
  controllers: [SignalsController],
  exports: [SignalsService],
})
export class SignalsModule {}
