import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';
import { TopicModule } from './modules/topic/topic.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ExamModule, TopicModule],
})
export class AppModule {}
