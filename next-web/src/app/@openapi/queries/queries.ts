// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthService, HealthService, UsersService } from "../requests/services.gen";
import { LoginUserInput } from "../requests/types.gen";
import * as Common from "./common";
export const useAuthServiceAuthControllerRefreshToken = <TData = Common.AuthServiceAuthControllerRefreshTokenDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAuthServiceAuthControllerRefreshTokenKeyFn(queryKey), queryFn: () => AuthService.authControllerRefreshToken() as TData, ...options });
export const useHealthServiceHealthControllerCheckHealth = <TData = Common.HealthServiceHealthControllerCheckHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseHealthServiceHealthControllerCheckHealthKeyFn(queryKey), queryFn: () => HealthService.healthControllerCheckHealth() as TData, ...options });
export const useUsersServiceUsersControllerCreateUser = <TData = Common.UsersServiceUsersControllerCreateUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => UsersService.usersControllerCreateUser() as unknown as Promise<TData>, ...options });
export const useAuthServiceAuthControllerLogin = <TData = Common.AuthServiceAuthControllerLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LoginUserInput;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LoginUserInput;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.authControllerLogin({ requestBody }) as unknown as Promise<TData>, ...options });
