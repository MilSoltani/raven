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
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { ParseSortPipe } from 'src/common/pipes/parse-sort.pipe';
import { ParseIncludeQueryPipe } from 'src/common/pipes/parse-include-query.pipe';
import {
  Prisma,
  Ticket,
} from 'src/infrastructure/database/generated/prisma/client';
import { ParseIncludeBodyPipe } from 'src/common/pipes/parse-include-body.pipe';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(
    @Body('data') createTicketDto: CreateTicketDto,
    @Body(
      'include',
      new ParseIncludeBodyPipe({
        creator: ['id', 'username'],
        agent: ['id', 'username'],
      }),
    )
    include?: Prisma.TicketInclude,
  ): Promise<Ticket> {
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
      include,
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
    @Query(
      'include',
      new ParseIncludeQueryPipe({
        creator: ['id', 'username'],
        agent: ['id', 'username'],
      }),
    )
    include?: Prisma.TicketInclude,
  ) {
    return this.ticketsService.findMany({
      where: filter,
      include,
      orderBy: sort,
    });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query(
      'include',
      new ParseIncludeBodyPipe({
        creator: ['id', 'username'],
        agent: ['id', 'username'],
      }),
    )
    include?: Prisma.TicketInclude,
  ) {
    return this.ticketsService.findOne({
      where: { id },
      include,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('data') updateTicketDto: UpdateTicketDto,
    @Body(
      'include',
      new ParseIncludeBodyPipe({
        creator: ['id', 'username'],
        agent: ['id', 'username'],
      }),
    )
    include?: Prisma.TicketInclude,
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
      include,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.delete({ id });
  }
}
