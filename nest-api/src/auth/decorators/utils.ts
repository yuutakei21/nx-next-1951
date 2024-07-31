import { User, UserRole } from '../../@generated/prisma-client';

export const hasRole = (user: User, role: UserRole) => {
  return user.role.indexOf(role) >= 0;
};

export const isAdmin = (user: User) => {
  return hasRole(user, UserRole.ADMIN);
};

export const isUser = (user: User) => {
  return hasRole(user, UserRole.USER);
};
