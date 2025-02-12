import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SignalsService } from './signals.service';
import { CreateXRayDto, UpdateXRayDto } from './dto/create-xray.dto';

@ApiTags('Signals')
@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all signals' })
  @ApiResponse({ status: 200, description: 'List of all signals' })
  async getAllSignals() {
    return this.signalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a signal by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Signal ID' })
  async getOne(@Param('id') id: string) {
    return this.signalsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new signal' })
  async create(@Body() createDto: CreateXRayDto) {
    return this.signalsService.createSignal(createDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a signal' })
  @ApiParam({ name: 'id', required: true, description: 'Signal ID' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateXRayDto) {
    return this.signalsService.updateSignal(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a signal' })
  @ApiParam({ name: 'id', required: true, description: 'Signal ID' })
  async remove(@Param('id') id: string) {
    return this.signalsService.deleteSignal(id);
  }

  @Get('filter/query')
  @ApiOperation({ summary: 'Filter signals by device ID and time range' })
  @ApiQuery({ name: 'deviceId', required: false })
  @ApiQuery({ name: 'fromTime', required: false })
  @ApiQuery({ name: 'toTime', required: false })
  async filterSignals(
    @Query('deviceId') deviceId?: string,
    @Query('fromTime') fromTime?: string,
    @Query('toTime') toTime?: string
  ) {
    return this.signalsService.filterSignals(deviceId, fromTime, toTime);
  }
}
