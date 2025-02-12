import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { XRayDocument } from './schemas/xray.schema';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Get()
  async getAllSignals(){
    return this.signalsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string){
    return this.signalsService.findById(id);
  }

  @Post()
  async create(@Body() createDto: any){
    return this.signalsService.createSignal(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any){
    return this.signalsService.updateSignal(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string){
    return this.signalsService.deleteSignal(id);
  }

  @Get('filter/query')
  async filterSignals(
    @Query('deviceId') deviceId?: string,
    @Query('fromTime') fromTime?: string,
    @Query('toTime') toTime?: string
  ): Promise<XRayDocument[]> {
    return this.signalsService.filterSignals(deviceId, fromTime, toTime);
  }
}
