import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { User } from '../@generated/prisma-client';
import { UserDto } from '../dtos/user.entity';

export class UsersWithPagination {
  @ApiProperty({ type: () => UserDto })
  @IsOptional()
  data?: User[];

  @ApiProperty({ type: () => Number })
  count: number;
}

export class SearchUserInput {
  @ApiProperty({ type: () => String })
  email: string;

  @ApiProperty({ type: () => String })
  enabled: string;
}

export class SortUserInput {
  @ApiProperty({ enum: ['asc', 'desc'] })
  @IsDate()
  updatedAt: 'asc' | 'desc';
}

export class GetUsersInput {
  @ApiProperty({ required: false, type: () => Number, default: 1 })
  page?: number = 1;

  @ApiProperty({ required: false, type: () => Number, default: 1000 })
  pageSize?: number = 1000;

  @ApiProperty({ required: false, type: () => SearchUserInput, default: null })
  search?: SearchUserInput;

  @ApiProperty({
    required: false,
    type: () => SortUserInput,
    default: { updatedAt: 'desc' },
  })
  sort?: SortUserInput = { updatedAt: 'desc' };
}
