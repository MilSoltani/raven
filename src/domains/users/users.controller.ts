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
import { ParseIncludePipe } from 'src/common/pipes/parse-include.pipe';
import {
  Prisma,
  User,
} from 'src/infrastructure/database/generated/prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
    };

    return this.usersService.create({
      data,
      include: {
        assignedTickets: true,
        createdTickets: true,
      },
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
      new ParseIncludePipe({
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne({
      userWhereUniqueInput: { id },
      include: {
        assignedTickets: true,
        createdTickets: true,
      },
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
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
      include: {
        assignedTickets: true,
        createdTickets: true,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete({ id: +id });
  }
}
