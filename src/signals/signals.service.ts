import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XRay, XRayDocument } from './schemas/xray.schema';

@Injectable()
export class SignalsService {
  private logger = new Logger(SignalsService.name);
  constructor(@InjectModel(XRay.name) private xRayModel: Model<XRayDocument>) {}

  async processAndSaveXRayData(xrayData: Record<string, any>){
    for (const [deviceId, payload] of Object.entries(xrayData)) {
      const { data, time } = payload as any;
      const dataLength = Array.isArray(data) ? data.length : 0;
      const dataVolume = JSON.stringify(data).length; 
      this.logger.log(`Saving x-ray data for device ${deviceId} at time ${time}`);
      await this.xRayModel.create({
        deviceId,
        time,
        dataLength,
        dataVolume,
        rawData: payload,
      });
    }
  }
}
