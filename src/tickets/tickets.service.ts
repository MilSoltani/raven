import { Injectable } from '@nestjs/common';
import { Prisma, Ticket } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    ticketWhereUniqueInput: Prisma.TicketWhereUniqueInput,
  ): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: ticketWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TicketWhereUniqueInput;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput;
  }): Promise<Ticket[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ticket.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.TicketUpdateInput;
  }): Promise<Ticket> {
    const { where, data } = params;
    return this.prisma.ticket.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.TicketWhereUniqueInput): Promise<Ticket> {
    return this.prisma.ticket.delete({
      where,
    });
  }
}
