import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './domains/users/users.module';
import { TicketsModule } from './domains/tickets/tickets.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
