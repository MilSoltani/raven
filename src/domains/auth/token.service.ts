import { Injectable } from '@nestjs/common';
import { AuthUser, CreateTokenPlan, TokenType } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID } from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  createAccessToken(user: AuthUser): CreateTokenPlan {
    const { secret, expiresIn } = this.getTokenConfig('access');

    const token = this.jwtService.sign(
      { username: user.username, sub: user.id },
      { secret, expiresIn },
    );

    return { token, expiresIn };
  }

  createRefreshToken(user: AuthUser): CreateTokenPlan {
    const { secret, expiresIn } = this.getTokenConfig('refresh');

    const token = this.jwtService.sign(
      { username: user.username, sub: user.id },
      { secret, expiresIn },
    );

    return { token, expiresIn };
  }

  getTokenConfig(tokenType: TokenType) {
    const TOKEN_CONFIG = {
      access: {
        secretKey: 'JWT_ACCESS_TOKEN_SECRET',
        expirationKey: 'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      },
      refresh: {
        secretKey: 'JWT_REFRESH_TOKEN_SECRET',
        expirationKey: 'JWT_REFRESH_TOKEN_EXPIRATION_MS',
      },
    } as const;

    const config = TOKEN_CONFIG[tokenType];
    const familyId = randomUUID();

    const secret = this.configService.get<string>(config.secretKey);
    const expiresIn = Number(this.configService.get(config.expirationKey));

    if (!secret || !expiresIn) {
      throw new Error('Missing JWT config');
    }

    return { secret, expiresIn, familyId };
  }

  hashToken(token: string) {
    return createHash('sha256').update(token, 'utf8').digest('hex');
  }
}
