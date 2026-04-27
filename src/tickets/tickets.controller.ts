import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Prisma, Ticket } from 'src/generated/prisma/client';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { ParseSortPipe } from 'src/common/pipes/parse-sort.pipe';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    const data: Prisma.TicketCreateInput = {
      subject: createTicketDto.subject,
      description: createTicketDto.description,
      status: createTicketDto.status,
      priority: createTicketDto.priority,
      creator: {
        connect: { id: createTicketDto.creatorId },
      },
      agent: createTicketDto.agentId
        ? { connect: { id: createTicketDto.agentId } }
        : undefined,
    };

    return this.ticketsService.create({
      data,
      include: {
        creator: { omit: { password: true } },
        agent: { omit: { password: true } },
      },
    });
  }

  @Get()
  findAll(
    @Query(
      'filter',
      new ParseFilterPipe({
        allowedPaths: [
          'createdAt',
          'subject',
          'status',
          'priority',
          'creator.username',
          'creator.id',
          'agent.username',
          'agent.id',
        ],
        maxDepth: 3,
      }),
    )
    filter: Prisma.TicketWhereInput,
    @Query(
      'sort',
      new ParseSortPipe({
        maxDepth: 2,
        allowedPaths: [
          'createdAt',
          'subject',
          'creator.username',
          'agent.username',
        ],
      }),
    )
    sort?: Prisma.TicketOrderByWithRelationInput,
  ) {
    return this.ticketsService.findMany({
      where: filter,
      include: {
        creator: { omit: { password: true } },
        agent: { omit: { password: true } },
      },
      orderBy: sort,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne({
      where: { id },
      include: {
        creator: { omit: { password: true } },
        agent: { omit: { password: true } },
      },
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const data: Prisma.TicketUpdateInput = {
      subject: updateTicketDto.subject,
      description: updateTicketDto.description,
      status: updateTicketDto.status,
      priority: updateTicketDto.priority,
      agent: updateTicketDto.agentId
        ? { connect: { id: updateTicketDto.agentId } }
        : undefined,
    };

    return this.ticketsService.update({
      where: { id },
      data,
      include: {
        creator: { omit: { password: true } },
        agent: { omit: { password: true } },
      },
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.delete({ id });
  }
}
