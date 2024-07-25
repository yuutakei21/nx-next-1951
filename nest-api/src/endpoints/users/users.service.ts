import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { SearchUserInput, SortUserInput } from './types';

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

  async create(createInput: Prisma.UserCreateInput) {
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
      omit: {
        password: true,
      },
    });
    console.log(`create user id: ${res.id}`);
    return res;
  }

  async update(id: string, updateInput: Prisma.UserUpdateInput) {
    console.log(`update user id: ${id}`);
    const { password: rawPassword, ...updateUserInput } = updateInput;
    let password: string;
    if (rawPassword) {
      password = await this.hashPassword(rawPassword as string);
    }
    const res = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInput,
        password,
      },
      omit: {
        password: true,
      },
    });
    return res;
  }

  async disable(id: string) {
    console.log(`disable user id: ${id}`);
    const res = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        enabled: false,
      },
    });
    res.password = '';
    return res;
  }

  normalizeSearchUser(search: SearchUserInput) {
    console.log(search);
    const where = { AND: [] };
    where.AND = [];

    // enabled
    if (search && search.enabled === 'all') {
      // search all
    } else {
      where.AND.push({
        enabled: true,
      });
    }
    // email
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
