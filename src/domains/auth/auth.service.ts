import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthUserService } from './auth-user.service';
import { AuthUser } from './types';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private authUserService: AuthUserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(username: string, pass: string): Promise<AuthUser | null> {
    const user = await this.authUserService.findUserByUsername(username);
    if (user === null) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    return isMatch
      ? {
          id: user.id,
          username: user.username,
        }
      : null;
  }

  issueTokens(user: AuthUser) {
    if (user === null) throw new UnauthorizedException();

    const access = this.tokenService.createAccessToken(user);
    const refresh = this.tokenService.createRefreshToken(user);

    return { access, refresh };
  }
}
