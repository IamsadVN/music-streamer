import { NextFunction, Request, Response } from "express";
import { apiLogger } from "../../utils/logger.js";

export async function requestLogger(req: Request, res: Response, next: NextFunction) {
    apiLogger.info(`${req.method} ${req.path} (Client: ${req.ip})`);

    next();
}