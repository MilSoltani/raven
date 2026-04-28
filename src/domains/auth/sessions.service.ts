import { Injectable } from '@nestjs/common';
import { Session } from 'src/infrastructure/database/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { TokenService } from './token.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SessionsService {
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokenService,
  ) {}

  async create(params: {
    userId: number;
    refreshToken: string;
    expiresIn: number;
    userAgent?: string;
    ip?: string;
  }): Promise<Session> {
    const refreshTokenHash = this.tokenService.hashToken(params.refreshToken);

    return this.prismaService.session.create({
      data: {
        refreshTokenHash,
        familyId: randomUUID(),
        expiresAt: new Date(Date.now() + params.expiresIn),
        userAgent: params.userAgent,
        ip: params.ip,
        user: {
          connect: { id: params.userId },
        },
      },
    });
  }

  async findSessionByToken(refreshToken: string): Promise<Session | null> {
    const refreshTokenHash = this.tokenService.hashToken(refreshToken);

    const session = await this.prismaService.session.findUnique({
      where: { refreshTokenHash },
    });

    return session;
  }

  async invalidateFamilySessions(familyId: string) {
    return this.prismaService.session.updateMany({
      where: { familyId },
      data: { revoked: true },
    });
  }
  async rotate(
    session: Session,
    params: {
      userId: number;
      refreshToken: string;
      familyId: string;
      expiresIn: number;
      userAgent?: string;
      ip?: string;
    },
  ) {
    const refreshTokenHash = this.tokenService.hashToken(params.refreshToken);

    const [, newSession] = await this.prismaService.$transaction([
      this.prismaService.session.update({
        where: { id: session.id },
        data: { revoked: true },
      }),

      this.prismaService.session.create({
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
      }),
    ]);

    return newSession;
  }

  async revoke(sessionId: number) {
    return await this.prismaService.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });
  }
}
