import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DateService } from './date.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateDateDto } from './dto/create-date.dto';
import { RangeDateDto } from './dto/range-date.dto';

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
  findByDate(@Query() { startDate, endDate }: RangeDateDto) {
    return this.dateService.findByDate(startDate, endDate);
  }

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    return this.dateService.create(createDateDto);
  }
}
