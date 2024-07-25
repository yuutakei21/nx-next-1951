import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useQuery, useMutation, useQueryClient, type QueryClient, type UseMutationOptions, type UseQueryOptions, type MutationFunction, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
export type UserCreateInputDto = {
    email: string;
    password: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    enabled?: boolean;
    tenantId?: number;
    departmentId?: number;
    timestamp?: string;
    createdAt?: string;
    updatedAt?: string;
};
export type DepartmentDto = {
    id: number;
    name: string;
    users: UserDto;
    tenant: TenantDto;
    tenantId: number;
    createdAt: string;
    updatedAt: string;
};
export type UserDto = {
    id: number;
    role: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    enabled: boolean;
    tenant?: TenantDto;
    tenantId?: number;
    department?: DepartmentDto;
    departmentId?: number;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
};
export type TenantDto = {
    id: number;
    name: string;
    enabled: boolean;
    users: UserDto;
    departments: DepartmentDto;
    createdAt: string;
    updatedAt: string;
};
export type SearchUserInput = {
    email: string;
};
export type SortUserInput = {
    updatedAt: "asc" | "desc";
};
export type GetUsersInput = {
    page: number;
    pageSize: number;
    search: SearchUserInput;
    sort: SortUserInput;
};
export type LoginUserInput = {
    email: string;
    password: string;
};
export type AxiosConfig = {
    paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
    mutations?: MutationConfigs;
    axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
    const requests = makeRequests(axios, config?.axios);
    return {
        requests,
        queries: makeQueries(requests),
        mutations: makeMutations(requests, config?.mutations)
    };
}
function useRapiniMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, config?: (queryClient: QueryClient) => Pick<UseMutationOptions<TData, TError, TVariables, TContext>, "onSuccess" | "onSettled" | "onError">, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationResult<TData, TError, TVariables, TContext> {
    const { onSuccess, onError, onSettled, ...rest } = options ?? {};
    const queryClient = useQueryClient();
    const conf = config?.(queryClient);
    const mutationOptions: typeof options = {
        onSuccess: (data: TData, variables: TVariables, context?: TContext) => {
            conf?.onSuccess?.(data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onError: (error: TError, variables: TVariables, context?: TContext) => {
            conf?.onError?.(error, variables, context);
            onError?.(error, variables, context);
        },
        onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => {
            conf?.onSettled?.(data, error, variables, context);
            onSettled?.(data, error, variables, context);
        },
        ...rest
    };
    return useMutation({ mutationFn, ...mutationOptions });
}
function nullIfUndefined<T>(value: T): NonNullable<T> | null {
    return typeof value === "undefined" ? null : value as NonNullable<T> | null;
}
export const queryKeys = {
    authControllerRefreshToken: () => ["authControllerRefreshToken"] as const,
    healthControllerCheckHealth: () => ["healthControllerCheckHealth"] as const
} as const;
export type QueryKeys = typeof queryKeys;
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
    return {
        usersControllerCreateUser: (payload: UserCreateInputDto) => axios.request<UserDto>({
            method: "post",
            url: `/api/users/create`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        usersControllerUsers: (payload: GetUsersInput) => axios.request<UserDto[]>({
            method: "post",
            url: `/api/users/all`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        authControllerRefreshToken: () => axios.request<unknown>({
            method: "get",
            url: `/api/auth`
        }).then(res => res.data),
        authControllerLogin: (payload: LoginUserInput) => axios.request<unknown>({
            method: "post",
            url: `/api/auth`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        healthControllerCheckHealth: () => axios.request<{
            status?: string;
            info?: {
                [key: string]: {
                    [key: string]: string;
                };
            };
            error?: {
                [key: string]: {
                    [key: string]: string;
                };
            };
            details?: {
                [key: string]: {
                    [key: string]: string;
                };
            };
        }>({
            method: "get",
            url: `/api/health`
        }).then(res => res.data)
    } as const;
}
export type Requests = ReturnType<typeof makeRequests>;
export type Response<T extends keyof Requests> = Awaited<ReturnType<Requests[T]>>;
function makeQueries(requests: Requests) {
    return {
        useAuthControllerRefreshToken: (options?: Omit<UseQueryOptions<Response<"authControllerRefreshToken">, unknown, Response<"authControllerRefreshToken">, ReturnType<QueryKeys["authControllerRefreshToken"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"authControllerRefreshToken">, unknown> => useQuery({ queryKey: queryKeys.authControllerRefreshToken(), queryFn: () => requests.authControllerRefreshToken(), ...options }),
        useHealthControllerCheckHealth: (options?: Omit<UseQueryOptions<Response<"healthControllerCheckHealth">, unknown, Response<"healthControllerCheckHealth">, ReturnType<QueryKeys["healthControllerCheckHealth"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"healthControllerCheckHealth">, unknown> => useQuery({ queryKey: queryKeys.healthControllerCheckHealth(), queryFn: () => requests.healthControllerCheckHealth(), ...options })
    } as const;
}
type MutationConfigs = {
    useUsersControllerCreateUser?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"usersControllerCreateUser">, unknown, Parameters<Requests["usersControllerCreateUser"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useUsersControllerUsers?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"usersControllerUsers">, unknown, Parameters<Requests["usersControllerUsers"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useAuthControllerLogin?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"authControllerLogin">, unknown, Parameters<Requests["authControllerLogin"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
};
function makeMutations(requests: Requests, config?: Config["mutations"]) {
    return {
        useUsersControllerCreateUser: (options?: Omit<UseMutationOptions<Response<"usersControllerCreateUser">, unknown, Parameters<Requests["usersControllerCreateUser"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"usersControllerCreateUser">, unknown, Parameters<Requests["usersControllerCreateUser"]>[0]>(payload => requests.usersControllerCreateUser(payload), config?.useUsersControllerCreateUser, options),
        useUsersControllerUsers: (options?: Omit<UseMutationOptions<Response<"usersControllerUsers">, unknown, Parameters<Requests["usersControllerUsers"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"usersControllerUsers">, unknown, Parameters<Requests["usersControllerUsers"]>[0]>(payload => requests.usersControllerUsers(payload), config?.useUsersControllerUsers, options),
        useAuthControllerLogin: (options?: Omit<UseMutationOptions<Response<"authControllerLogin">, unknown, Parameters<Requests["authControllerLogin"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"authControllerLogin">, unknown, Parameters<Requests["authControllerLogin"]>[0]>(payload => requests.authControllerLogin(payload), config?.useAuthControllerLogin, options)
    } as const;
}
