import { Injectable } from '@nestjs/common';
import { Session } from 'src/infrastructure/database/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { TokenService } from './token.service';

@Injectable()
export class SessionsService {
  constructor(
    private prismaService: PrismaService,
    private tockenService: TokenService,
  ) {}

  async create(params: {
    userId: number;
    refreshToken: string;
    familyId: string;
    expiresIn: number;
    userAgent?: string;
    ip?: string;
  }): Promise<Session> {
    const refreshTokenHash = this.tockenService.hashToken(params.refreshToken);

    return this.prismaService.session.create({
      data: {
        refreshTokenHash,
        familyId: params.familyId,
        expiresAt: new Date(Date.now() + params.expiresIn),
        userAgent: params.userAgent,
        ip: params.ip,
        user: {
          connect: { id: params.userId },
        },
      },
    });
  }
}
