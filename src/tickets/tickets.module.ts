import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService],
  exports: [TicketsService],
})
export class TicketsModule {}
