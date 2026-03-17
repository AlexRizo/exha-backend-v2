import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ExamModule } from './modules/exam/exam.module';
import { TopicModule } from './modules/topic/topic.module';
import { DateModule } from './modules/date/date.module';
import { QuestionModule } from './modules/question/question.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ExamModule,
    TopicModule,
    DateModule,
    QuestionModule,
  ],
})
export class AppModule {}
