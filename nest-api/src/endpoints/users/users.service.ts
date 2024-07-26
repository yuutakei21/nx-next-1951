import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CustomPrismaService } from 'nestjs-prisma';
import { SearchUserInput, SortUserInput } from './types';
import { Prisma, PrismaClient, User } from '../../@generated/prisma-client';
import { CreateUserDto } from '../../@generated/prisma-class/user/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('CustomPrismaClient') // 👈 use unique name to reference
    private prisma: CustomPrismaService<PrismaClient>, // specify PrismaClient for type-safety & auto-completion
  ) {}

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

  async create(createInput: CreateUserDto) {
    console.log(`create user`);
    const {
      password: rawPassword,
      tenant,
      department,
      ...createUserInput
    } = createInput;
    let password: string;
    if (rawPassword) {
      password = await this.hashPassword(rawPassword);
    }
    const res = await this.prisma.client.user.create({
      data: {
        ...createUserInput,
        tenantId: tenant.connect.id,
        departmentId: department.connect.id,
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
    const res = await this.prisma.client.user.update({
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
    const res = await this.prisma.client.user.update({
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

    const data = await this.prisma.client.user.findMany({
      skip,
      take: pageSize,
      where: where,
      orderBy,
    });

    const count = await this.prisma.client.user.count({ where: where });

    return {
      data,
      count,
    };
  }

  findOneByEmail(email: string) {
    return this.prisma.client.user.findFirst({
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
    return this.prisma.client.user.update({
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
