import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ModeratorController],
  providers: [ModeratorService, PrismaService],
})
export class ModeratorModule {}
