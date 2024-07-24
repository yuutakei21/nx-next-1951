/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserInput } from '../models/LoginUserInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static usersControllerCreateUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/create',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginUserInput,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerRefreshToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth',
        });
    }
    /**
     * @returns any The Health Check is successful
     * @throws ApiError
     */
    public static healthControllerCheckHealth(): CancelablePromise<{
        status?: string;
        info?: Record<string, Record<string, string>> | null;
        error?: Record<string, Record<string, string>> | null;
        details?: Record<string, Record<string, string>>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health',
            errors: {
                503: `The Health Check is not successful`,
            },
        });
    }
}
