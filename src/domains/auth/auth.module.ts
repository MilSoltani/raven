import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { AuthService } from './auth.service';
import { AuthUserService } from './auth-user.service';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [
    AuthService,
    AuthUserService,
    PrismaService,
    TokenService,
    LocalStrategy,
    JwtService,
    SessionsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
