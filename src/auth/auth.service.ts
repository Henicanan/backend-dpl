import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    roleName: string,
  ): Promise<User> {
    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });
    if (!role) throw new Error('Role not found');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { email, password: hashedPassword, roleId: role.id },
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; role: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) throw new UnauthorizedException('invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('invalid credentials');

    const payload = { sub: user.id, role: user.roleId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, role: user.role.name };
  }

  async validateUserRole(
    userId: number,
    requiredRole: string,
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    return user.role.name === requiredRole;
  }
}
