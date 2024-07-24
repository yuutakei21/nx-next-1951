import { User } from '@prisma/client';

export class UsersWithPagination {
  data?: Array<User>;
  count: number;
}

export class SearchUserType {
  name: string;
}

export class SortUserType {
  updatedAt: string;
}
