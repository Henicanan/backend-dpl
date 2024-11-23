import { Controller, Get, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('get-all-students')
  async getAllStudents(@Query('search') search?: string) {
    try {
      const students = await this.studentService.getAllStudents(search);
      return { students };
    } catch (err) {
      return {
        details: err.message,
      };
    }
  }
}
