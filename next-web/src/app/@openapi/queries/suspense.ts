// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AuthService, HealthService } from "../requests/services.gen";
import * as Common from "./common";
export const useAuthServiceAuthControllerRefreshTokenSuspense = <TData = Common.AuthServiceAuthControllerRefreshTokenDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAuthServiceAuthControllerRefreshTokenKeyFn(queryKey), queryFn: () => AuthService.authControllerRefreshToken() as TData, ...options });
export const useHealthServiceHealthControllerCheckHealthSuspense = <TData = Common.HealthServiceHealthControllerCheckHealthDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseHealthServiceHealthControllerCheckHealthKeyFn(queryKey), queryFn: () => HealthService.healthControllerCheckHealth() as TData, ...options });
