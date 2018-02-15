/// <reference types="express" />
import { SakuraApi } from '@sakuraapi/api';
import { IAuthAudienceOptions } from '@sakuraapi/auth-audience/lib';
import { IAuthenticationAuthorityOptions } from '@sakuraapi/auth-native-authority';
import { ICustomTokenResult } from '@sakuraapi/auth-native-authority/lib/src';
import { NextFunction, Request, Response } from 'express';
export declare class Bootstrap {
    private sapi;
    private shuttingDown;
    boot(): Promise<SakuraApi>;
    authNativeAuthorityOptions(): IAuthenticationAuthorityOptions;
    authAudienceOptions(): IAuthAudienceOptions;
    onBeforeUserCreate(req: Request, res: Response, next: NextFunction): Promise<void>;
    onChangePasswordEmailRequest(user: any, req: Request, res: Response): Promise<any>;
    onForgotPasswordEmailRequest(user: any, token: string, req: Request, res: Response): Promise<void>;
    onLoginSuccess(user: any, jwt: any, sa: SakuraApi, req: Request, res: Response): Promise<void>;
    onResendEmailConfirmation(user: any, token: string, req: Request, res: Response): Promise<void>;
    onUserCreated(user: any, token: string, req: Request, res: Response): Promise<void>;
    onUserCreatedSendWelcomeEmail(user: any, token: string, req: Request, res: Response): Promise<void>;
    shutdownServer(signal: string): Promise<void>;
}
export declare function onInjectCustomToken(token: any, key: string, issuer: string, expiration: string, payload: any, jwtId: string): Promise<ICustomTokenResult[]>;
