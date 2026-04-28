import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './domains/users/users.module';
import { TicketsModule } from './domains/tickets/tickets.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    TicketsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
