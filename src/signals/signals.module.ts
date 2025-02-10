import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XRay, XRaySchema } from './schemas/xray.schema';
import { SignalsService } from './signals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XRaySchema }]),
  ],
  providers: [SignalsService],
  exports: [SignalsService],
})
export class SignalsModule {}
