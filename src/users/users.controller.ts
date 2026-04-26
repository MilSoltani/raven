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
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaQueryPipe } from 'src/common/pipes/parse-where.pipe';

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
      password: createUserDto.password,
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
    @Query('where', PrismaQueryPipe)
    where?: Prisma.UserWhereInput,
    @Query('orderBy', PrismaQueryPipe)
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    return this.usersService.findMany({
      where,
      include: {
        assignedTickets: true,
        createdTickets: true,
      },
      orderBy,
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
      password: updateUserDto.password,
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
