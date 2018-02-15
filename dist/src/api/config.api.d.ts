/// <reference types="express" />
import { SakuraApi } from '@sakuraapi/api';
import { NextFunction, Request, Response } from 'express';
import { LogService } from '../services/log-service';
export { SakuraApi };
export declare class ConfigApi extends {
    sapi?: SakuraApi;
    sapiConfig?: any;
} {
    private log;
    constructor(log: LogService);
    deleteHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    getHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    headHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    postHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    putHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
    configHandler(req: Request, res: Response): Promise<void>;
}
