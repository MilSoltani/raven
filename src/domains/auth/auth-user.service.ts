import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { AuthUser, AuthUserWithPassword } from './types';
import { Prisma } from 'src/infrastructure/database/generated/prisma/client';

@Injectable()
export class AuthUserService {
  constructor(private prismaService: PrismaService) {}

  async findUserByUsername(
    username: string,
  ): Promise<AuthUserWithPassword | null> {
    const user = await this.prismaService.user.findUnique({
      select: { id: true, username: true, password: true },
      where: { username },
    });

    if (!user || !user.password) return null;

    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  }

  async create(params: { data: Prisma.UserCreateInput }): Promise<AuthUser> {
    return this.prismaService.user.create({
      data: params.data,
      select: {
        id: true,
        username: true,
      },
    });
  }
}
