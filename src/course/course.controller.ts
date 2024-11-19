import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('get-all-courses')
  async getAllCourses(@Query('search') search?: string) {
    try {
      const courses = await this.courseService.getAllCourses(search);
      return { courses };
    } catch (error) {
      return {
        error: 'Произошла ошибка при получении курсов',
        details: error.message,
      };
    }
  }
}
