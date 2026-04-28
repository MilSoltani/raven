import {
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { type AuthRequest } from './types';
import { SessionsService } from './sessions.service';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly sessionsService: SessionsService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;

    const { access, refresh } = this.authService.issueTokens(user);

    await this.sessionsService.create({
      userId: user.id,
      refreshToken: refresh.token,
      expiresIn: refresh.expiresIn,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    const secure = this.configService.get('NODE_ENV') === 'production';

    res.cookie('ACCESS_TOKEN', access.token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/',
      maxAge: access.expiresIn,
      priority: 'high',
    });

    res.cookie('REFRESH_TOKEN', refresh.token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: refresh.expiresIn,
      priority: 'high',
    });

    return { message: 'Login successful' };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const refreshToken = req.cookies?.REFRESH_TOKEN as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const session = await this.sessionsService.findSessionByToken(refreshToken);

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (session.revoked) {
      await this.sessionsService.invalidateFamilySessions(session.familyId);

      throw new UnauthorizedException('Security breach detected');
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired');
    }

    const { access, refresh } = this.authService.issueTokens(user);

    await this.sessionsService.rotate(session, {
      userId: user.id,
      refreshToken: refresh.token,
      familyId: session?.familyId,
      expiresIn: refresh.expiresIn,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    const secure = this.configService.get('NODE_ENV') === 'production';

    res.cookie('ACCESS_TOKEN', access.token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/',
      maxAge: access.expiresIn,
      priority: 'high',
    });

    res.cookie('REFRESH_TOKEN', refresh.token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: refresh.expiresIn,
      priority: 'high',
    });

    return { message: 'Refresh successful' };
  }
}
