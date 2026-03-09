import {
  Controller,
  Get,
  Param,
  ParseDatePipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { DateService } from './date.service';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth()
@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Get()
  findAll() {
    return this.dateService.findAll();
  }

  @Get(':dateId')
  findOne(@Param('dateId', ParseUUIDPipe) dateId: string) {
    return this.dateService.findOne(dateId);
  }

  @Get('date')
  findByDate(
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.dateService.findByDate(startDate, endDate);
  }
}
