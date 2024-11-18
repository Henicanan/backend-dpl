import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async createCourse(
    title: string,
    modules: {
      title: string;
      lessons: { title: string; content: string; videoUrl: string }[];
    }[],
  ) {
    return this.prisma.course.create({
      data: {
        title,
        modules: {
          create: modules.map((module) => ({
            title: module.title,
            lessons: {
              create: module.lessons,
            },
          })),
        },
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });
  }
}
