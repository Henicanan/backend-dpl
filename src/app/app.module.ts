import { ModeratorModule } from './../moderators/moderator.module';
import { StudentsModule } from '../students/student.module';
import { CourseModule } from './../course/course.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ModeratorModule,
    StudentsModule,
    CourseModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
