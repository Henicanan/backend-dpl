import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('auth')
export class AuthController {
  prisma: PrismaService;
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('roleName') roleName: string,
  ) {
    try {
      return await this.authService.register(email, password, roleName);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const { accessToken, role } = await this.authService.login(email, password);
    return { accessToken, role };
  }
}
