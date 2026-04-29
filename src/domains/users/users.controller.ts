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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseSortPipe } from 'src/common/pipes/parse-sort.pipe';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { ParseSelectQueryPipe } from 'src/common/pipes/parse-select-query.pipe';
import {
  Prisma,
  User,
} from 'src/infrastructure/database/generated/prisma/client';
import { ParseSelectBodyPipe } from 'src/common/pipes/parse-select-body.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body('data') createUserDto: CreateUserDto,
    @Body(
      'select',
      new ParseSelectBodyPipe({
        allowedColumns: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'createdAt',
        ],
        allowedRelations: {
          createdTickets: ['id', 'subject'],
          assignedTickets: ['id', 'subject'],
        },
        requiredColumns: ['id'],
      }),
    )
    select?: Prisma.UserSelect,
  ): Promise<User> {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
    };

    return this.usersService.create({
      data,
      select,
    });
  }

  @Get()
  findAll(
    @Query(
      'filter',
      new ParseFilterPipe({
        allowedPaths: ['createdAt', 'firstName', 'lastName', 'username'],
        maxDepth: 3,
      }),
    )
    filter: Prisma.UserWhereInput,
    @Query(
      'sort',
      new ParseSortPipe({
        maxDepth: 1,
        allowedPaths: ['createdAt', 'firstName', 'lastName', 'username'],
      }),
    )
    sort?: Prisma.UserOrderByWithRelationInput,
    @Query(
      'select',
      new ParseSelectQueryPipe({
        allowedColumns: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'updatedAt',
          'createdAt',
        ],
        allowedRelations: {
          createdTickets: ['id', 'subject'],
          assignedTickets: ['id', 'subject'],
        },
        requiredColumns: ['id'],
      }),
    )
    select?: Prisma.UserSelect,
  ) {
    return this.usersService.findMany({
      where: filter,
      select,
      orderBy: sort,
    });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query(
      'select',
      new ParseSelectQueryPipe({
        allowedColumns: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'updatedAt',
          'createdAt',
        ],
        allowedRelations: {
          createdTickets: ['id', 'subject'],
          assignedTickets: ['id', 'subject'],
        },
        requiredColumns: ['id'],
      }),
    )
    select?: Prisma.UserSelect,
  ) {
    return this.usersService.findOne({
      userWhereUniqueInput: { id },
      select,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('data') updateUserDto: UpdateUserDto,
    @Body(
      'select',
      new ParseSelectBodyPipe({
        allowedColumns: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'createdAt',
        ],
        allowedRelations: {
          createdTickets: ['id', 'subject'],
          assignedTickets: ['id', 'subject'],
        },
        requiredColumns: ['id'],
      }),
    )
    select?: Prisma.UserSelect,
  ): Promise<User> {
    const data: Prisma.UserUpdateInput = {
      email: updateUserDto.email,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      username: updateUserDto.username,
    };

    return this.usersService.update({
      where: { id },
      data,
      select,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete({ id: +id });
  }
}
