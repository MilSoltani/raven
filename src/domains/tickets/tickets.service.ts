import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Ticket,
} from 'src/infrastructure/database/generated/prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    where: Prisma.TicketWhereUniqueInput;
    include?: Prisma.TicketInclude;
  }): Promise<Ticket | null> {
    const { where, include } = params;
    return this.prisma.ticket.findUnique({
      where,
      include,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TicketWhereUniqueInput;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput;
    select?: Prisma.TicketSelect;
  }): Promise<Ticket[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.prisma.ticket.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async create(params: {
    data: Prisma.TicketCreateInput;
    include?: Prisma.TicketInclude;
  }): Promise<Ticket> {
    const { data, include } = params;
    return this.prisma.ticket.create({
      data,
      include,
    });
  }

  async update(params: {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.TicketUpdateInput;
    include?: Prisma.TicketInclude;
  }): Promise<Ticket> {
    const { where, data, include } = params;
    return this.prisma.ticket.update({
      data,
      where,
      include,
    });
  }

  async delete(where: Prisma.TicketWhereUniqueInput): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where,
    });
  }
}
