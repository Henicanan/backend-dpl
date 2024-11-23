import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
})
export class StudentsModule {}
