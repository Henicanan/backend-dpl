import { CourseModule } from './../course/course.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
        CourseModule, AuthModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
