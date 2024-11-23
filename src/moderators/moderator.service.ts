import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ModeratorService {
  constructor(private prisma: PrismaService) {}

  async getAllModerators(search?: string) {
    const moderators = await this.prisma.user.findMany({
      where: {
        roleId: 2,
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
    return moderators;
  }
}
