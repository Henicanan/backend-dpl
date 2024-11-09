import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  @Roles('admin')
  @Get()
  getAdminData() {
    return 'Admin data';
  }

  @Roles('moderator')
  @Get('moderator')
  getModeratorData() {
    return 'Moderator data';
  }

  @Roles('student')
  @Get('student')
  getStudentdData() {
    return 'Student data';
  }
}
