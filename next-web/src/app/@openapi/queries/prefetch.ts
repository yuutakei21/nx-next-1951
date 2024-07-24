// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, HealthService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseAuthServiceAuthControllerRefreshToken = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAuthServiceAuthControllerRefreshTokenKeyFn(), queryFn: () => AuthService.authControllerRefreshToken() });
export const prefetchUseHealthServiceHealthControllerCheckHealth = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseHealthServiceHealthControllerCheckHealthKeyFn(), queryFn: () => HealthService.healthControllerCheckHealth() });
