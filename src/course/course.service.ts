import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async createCourse(id: number, title: string, lessons: []) {
    
  }
}
