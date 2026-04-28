import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { type AuthRequest } from './types';
import { SessionsService } from './sessions.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly sessionsService: SessionsService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;

    const { access, refresh } = this.authService.issueTokens(user);

    await this.sessionsService.create({
      userId: user.id,
      refreshToken: refresh.token,
      familyId: refresh.familyId,
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
    });

    res.cookie('REFRESH_TOKEN', refresh.token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: refresh.expiresIn,
    });

    return { message: 'Login successful' };
  }
}
