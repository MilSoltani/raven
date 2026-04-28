import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { AuthService } from './auth.service';
import { AuthUserService } from './auth-user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SessionsService } from './sessions.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const rawAccessExpiry = config.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION_MS',
        );
        const ExpiryInSeconds = Number.parseInt(rawAccessExpiry, 10) / 1000;

        return {
          secret: config.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: ExpiryInSeconds,
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthUserService,
    PrismaService,
    TokenService,
    LocalStrategy,
    JwtService,
    SessionsService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
