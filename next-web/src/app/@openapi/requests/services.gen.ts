// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { UsersControllerCreateUserResponse, AuthControllerLoginData, AuthControllerLoginResponse, AuthControllerRefreshTokenResponse, HealthControllerCheckHealthResponse } from './types.gen';

export class UsersService {
    /**
     * @returns unknown
     * @throws ApiError
     */
    public static usersControllerCreateUser(): CancelablePromise<UsersControllerCreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/create'
        });
    }
    
}

export class AuthService {
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown
     * @throws ApiError
     */
    public static authControllerLogin(data: AuthControllerLoginData): CancelablePromise<AuthControllerLoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @returns unknown
     * @throws ApiError
     */
    public static authControllerRefreshToken(): CancelablePromise<AuthControllerRefreshTokenResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth'
        });
    }
    
}

export class HealthService {
    /**
     * @returns unknown The Health Check is successful
     * @throws ApiError
     */
    public static healthControllerCheckHealth(): CancelablePromise<HealthControllerCheckHealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health',
            errors: {
                503: 'The Health Check is not successful'
            }
        });
    }
    
}