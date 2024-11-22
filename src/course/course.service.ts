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

  async getAllCourses(search?: string) {
    return this.prisma.course.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
    });
  }

  async getCourseById(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });
  }

  async updateCourse(
    id: number,
    title: string,
    modules: {
      title: string;
      lessons: { title: string; content: string; videoUrl: string }[];
    }[],
  ) {
    const courseId = Number(id);

    await this.prisma.lesson.deleteMany({
      where: {
        module: {
          courseId: courseId,
        },
      },
    });
    await this.prisma.module.deleteMany({
      where: {
        courseId: courseId,
      },
    });

    return this.prisma.course.update({
      where: { id: courseId },
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

  async deleteCourse(id: number) {
    const courseId = Number(id);

    await this.prisma.lesson.deleteMany({
      where: {
        module: {
          courseId: courseId,
        },
      },
    });

    await this.prisma.module.deleteMany({
      where: {
        courseId: courseId,
      },
    });

    return this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }
}
