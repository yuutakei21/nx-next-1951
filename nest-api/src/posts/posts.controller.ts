import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindOneParams } from '../utils/findOneParams';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostsService } from './posts.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';

@ApiTags('posts')
@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({ type: PostDto, isArray: true })
  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @ApiOkResponse({ type: PostDto })
  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @ApiOkResponse({ type: PostDto })
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @ApiOkResponse({ type: PostDto })
  @Put(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, post);
  }

  @ApiOkResponse({ type: PostDto })
  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(id);
  }
}
