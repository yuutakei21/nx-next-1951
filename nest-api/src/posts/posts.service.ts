import { Inject, Injectable } from '@nestjs/common';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaError } from '../utils/prismaError';
import { PrismaClient } from '../@generated/prisma-client';
import { PrismaClientKnownRequestError } from '../@generated/prisma-client/runtime/library';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('CustomPrismaClient')
    private prismaService: CustomPrismaService<PrismaClient>,
  ) {}

  async getPosts() {
    try {
      return this.prismaService.client.post.findMany();
    } catch (error) {
      throw error;
    }
  }

  async getPostById(id: string) {
    try {
      return this.prismaService.client.post.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }
  async createPost(post: CreatePostDto) {
    try {
      return this.prismaService.client.post.create({
        data: {
          ...post,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id: string, post: UpdatePostDto) {
    try {
      return this.prismaService.client.post.update({
        where: {
          id,
        },
        data: {
          ...post,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: string) {
    try {
      return this.prismaService.client.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }
}
