import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { DateController } from './date.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [DateController],
  providers: [DateService],
  imports: [PrismaModule],
})
export class DateModule {}
