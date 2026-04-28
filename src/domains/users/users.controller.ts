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
import { ParseIncludeQueryPipe } from 'src/common/pipes/parse-include-query.pipe';
import {
  Prisma,
  User,
} from 'src/infrastructure/database/generated/prisma/client';
import { ParseIncludeBodyPipe } from 'src/common/pipes/parse-include-body.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Body(
      'include',
      new ParseIncludeBodyPipe({
        createdTickets: ['id', 'subject'],
        assignedTickets: ['id', 'subject'],
      }),
    )
    include?: Prisma.UserInclude,
  ): Promise<User> {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
    };

    return this.usersService.create({
      data,
      include,
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
      'include',
      new ParseIncludeQueryPipe({
        createdTickets: ['id', 'subject'],
        assignedTickets: ['id', 'subject'],
      }),
    )
    include?: Prisma.UserInclude,
  ) {
    return this.usersService.findMany({
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
        createdTickets: ['id', 'subject'],
        assignedTickets: ['id', 'subject'],
      }),
    )
    include?: Prisma.UserInclude,
  ) {
    return this.usersService.findOne({
      userWhereUniqueInput: { id },
      include,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('data') updateUserDto: UpdateUserDto,
    @Body(
      'include',
      new ParseIncludeBodyPipe({
        createdTickets: ['id', 'subject'],
        assignedTickets: ['id', 'subject'],
      }),
    )
    include?: Prisma.UserInclude,
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
      include,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete({ id: +id });
  }
}
