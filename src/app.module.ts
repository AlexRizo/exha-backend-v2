import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ExamModule],
})
export class AppModule {}
