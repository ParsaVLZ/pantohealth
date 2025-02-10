import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type XRayDocument = XRay & Document;

@Schema({ collection: 'signals' })
export class XRay {
  @Prop({ required: true })
  deviceId: string;
  
  @Prop({ required: true })
  time: number; 

  @Prop({ required: true })
  dataLength: number;

  @Prop()
  dataVolume: number; 

  @Prop({ type: Object })
  rawData: any;
}

export const XRaySchema = SchemaFactory.createForClass(XRay);
