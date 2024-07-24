import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

// CustomUnauthorizedException
export const CustomUnauthorizedException = new UnauthorizedException(
  'Could not log-in with the provided credentials',
);

// CustomBadRequestCredentialException
export const CustomBadRequestCredentialException = new BadRequestException(
  'Could not log-in with the provided credentials',
);
