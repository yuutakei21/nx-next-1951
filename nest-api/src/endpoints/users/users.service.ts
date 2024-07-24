/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { SearchUserInput, SortUserInput, UserCreateInputDto } from './types';

@Injectable()
export class UsersService {
  prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (genSaltError, salt) => {
        if (genSaltError) {
          reject(genSaltError);
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  }

  async create(createInput: UserCreateInputDto) {
    console.log(`create user`);
    const { password: rawPassword, ...createUserInput } = createInput;
    let password: string;
    if (rawPassword) {
      password = await this.hashPassword(rawPassword);
    }
    const res = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password,
      },
    });
    console.log(`create user id: ${res.id}`);
    res.password = '';
    return res;
  }

  async update(id: number, updateInput: Prisma.UserUpdateInput) {
    console.log(`update user id: ${id}`);
    console.log(updateInput);
    const { password: rawPassword, ...updateUserInput } = updateInput;
    let password: string;
    if (rawPassword) {
      password = await this.hashPassword(rawPassword as string);
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInput,
        password,
      },
    });
  }

  async disable(id: number) {
    console.log(`disable user id: ${id}`);
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        enabled: false,
      },
    });
  }

  normalizeSearchUser(search: any) {
    console.log(search);
    const where = { AND: [] };
    where.AND = [];
    if (search) {
      where.AND.push({
        email: { contains: search.email, mode: 'insensitive' },
      });
    }
    return where;
  }

  normalizeUserSort(sort: any) {
    const orderBy = [];
    if (!sort) return;
    orderBy.push(sort);
    return orderBy;
  }

  async findAll(
    skip: number,
    pageSize: number,
    search: SearchUserInput,
    sort: SortUserInput,
  ) {
    const where: Prisma.UserWhereInput = this.normalizeSearchUser(search);
    console.log(where);

    const orderBy: Prisma.UserOrderByWithRelationInput[] =
      this.normalizeUserSort(sort);

    const data = await this.prisma.user.findMany({
      skip,
      take: pageSize,
      where: where,
      orderBy,
    });

    const count = await this.prisma.user.count({ where: where });

    return {
      data,
      count,
    };
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  save(user: User) {
    const { id, ...updateData } = user;
    console.log(id);

    const data: Prisma.UserUncheckedUpdateInput = {
      ...updateData,
      updatedAt: new Date(),
    };
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
  }

  validateEmail(email: string) {
    const expression =
      // eslint-disable-next-line no-useless-escape
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return expression.test(email);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
