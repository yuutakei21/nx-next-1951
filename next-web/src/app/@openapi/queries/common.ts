// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthService, HealthService, UsersService } from "../requests/services.gen";
export type AuthServiceAuthControllerRefreshTokenDefaultResponse = Awaited<ReturnType<typeof AuthService.authControllerRefreshToken>>;
export type AuthServiceAuthControllerRefreshTokenQueryResult<TData = AuthServiceAuthControllerRefreshTokenDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAuthServiceAuthControllerRefreshTokenKey = "AuthServiceAuthControllerRefreshToken";
export const UseAuthServiceAuthControllerRefreshTokenKeyFn = (queryKey?: Array<unknown>) => [useAuthServiceAuthControllerRefreshTokenKey, ...(queryKey ?? [])];
export type HealthServiceHealthControllerCheckHealthDefaultResponse = Awaited<ReturnType<typeof HealthService.healthControllerCheckHealth>>;
export type HealthServiceHealthControllerCheckHealthQueryResult<TData = HealthServiceHealthControllerCheckHealthDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useHealthServiceHealthControllerCheckHealthKey = "HealthServiceHealthControllerCheckHealth";
export const UseHealthServiceHealthControllerCheckHealthKeyFn = (queryKey?: Array<unknown>) => [useHealthServiceHealthControllerCheckHealthKey, ...(queryKey ?? [])];
export type UsersServiceUsersControllerCreateUserMutationResult = Awaited<ReturnType<typeof UsersService.usersControllerCreateUser>>;
export type AuthServiceAuthControllerLoginMutationResult = Awaited<ReturnType<typeof AuthService.authControllerLogin>>;
