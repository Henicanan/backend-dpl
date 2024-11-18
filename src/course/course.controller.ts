import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('create-course')
  async createCourse(@Body() body: { title: string; modules: any[] }) {
    const { title, modules } = body;

    if (!title || !modules || !Array.isArray(modules)) {
      return { error: 'Некорректные данные' };
    }

    try {
      const newCourse = await this.courseService.createCourse(title, modules);
      return { message: 'Курс успешно создан', course: newCourse };
    } catch (error) {
      return {
        error: 'Произошла ошибка при создании курса',
        details: error.message,
      };
    }
  }
}
