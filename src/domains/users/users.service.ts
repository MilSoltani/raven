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
    include?: Prisma.UserInclude;
  }): Promise<User | null> {
    const { userWhereUniqueInput, include } = params;

    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include,
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
    include?: Prisma.UserInclude;
  }): Promise<User> {
    const { data, include } = params;

    return this.prisma.user.create({
      data,
      include,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    include?: Prisma.UserInclude;
  }): Promise<User> {
    const { where, data, include } = params;

    return this.prisma.user.update({
      data,
      where,
      include,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
