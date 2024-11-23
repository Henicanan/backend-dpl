import { Controller, Get, Query } from '@nestjs/common';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get('get-all-moderators')
  async getAllModerators(@Query('search') search?: string) {
    try {
      const moderators = await this.moderatorService.getAllModerators(search);
      return { moderators };
    } catch (err) {
      return {
        details: err.message,
      };
    }
  }
}
