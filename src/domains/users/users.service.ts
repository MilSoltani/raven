import { Injectable } from '@nestjs/common';
import {
  Prisma,
  User,
} from 'src/infrastructure/database/generated/prisma/client';

import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    userWhereUniqueInput: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<User | null> {
    const { userWhereUniqueInput, select } = params;

    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: Prisma.UserSelect;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, select } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async create(params: {
    data: Prisma.UserCreateInput;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    const { data, select } = params;

    return this.prisma.user.create({
      data,
      select,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    const { where, data, select } = params;

    return this.prisma.user.update({
      data,
      where,
      select,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
