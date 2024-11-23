import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async getAllStudents(search?: string) {
    const students = await this.prisma.user.findMany({
      where: {
        roleId: 3,
        ...(search
          ? {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : {}),
      },
    });
    return students;
  }
}
