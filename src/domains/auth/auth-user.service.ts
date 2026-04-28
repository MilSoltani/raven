import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { AuthUserWithPassword } from './types';

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
}
