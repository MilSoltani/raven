import {
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { AuthUser, type AuthRequest } from './types';
import { SessionsService } from './sessions.service';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { Prisma } from 'src/infrastructure/database/generated/prisma/client';
import { AuthUserService } from './auth-user.service';
import bcryptjs from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authUserService: AuthUserService,
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
      path: '/auth',
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
      path: '/auth',
      maxAge: refresh.expiresIn,
      priority: 'high',
    });

    return { message: 'Refresh successful' };
  }

  @Post('signup')
  async create(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() signupdto: SignUpDto,
  ): Promise<AuthUser> {
    const hashedPassword = await bcryptjs.hash(signupdto.password, 12);

    const data: Prisma.UserCreateInput = {
      email: signupdto.email,
      firstName: signupdto.firstName,
      lastName: signupdto.lastName,
      username: signupdto.username,
      password: hashedPassword,
    };

    const createdUser = await this.authUserService.create({ data });
    const { access, refresh } = this.authService.issueTokens(createdUser);

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
      path: '/auth',
      maxAge: refresh.expiresIn,
      priority: 'high',
    });

    await this.sessionsService.create({
      userId: createdUser.id,
      refreshToken: refresh.token,
      expiresIn: refresh.expiresIn,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    return createdUser;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.REFRESH_TOKEN as string;

    if (refreshToken) {
      const session =
        await this.sessionsService.findSessionByToken(refreshToken);

      if (session) {
        await this.sessionsService.revoke(session.id);
      }
    }

    const secure = this.configService.get('NODE_ENV') === 'production';

    res.clearCookie('ACCESS_TOKEN', {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/',
    });

    res.clearCookie('REFRESH_TOKEN', {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/auth',
    });

    return { message: 'Logout successful' };
  }
}
