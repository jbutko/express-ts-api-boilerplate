import * as debug from 'debug';
import { Request, Response, NextFunction } from 'express-serve-static-core';

const logger = debug('app:src/app/core/ErrorHandling.ts');

export interface IErrorResponse {
  status: number;
  message: string;
  detail: string;
  url?: string;
  stack?: string;
  type?: string;
  code?: string;
}

export class ErrorHandling {
  public static routeNotFound(req: Request, res: Response, next: NextFunction): Response {
    res.status(404);
    return res.json({
      status: 404,
      message: 'Route not found',
      url: req.url,
    });
  }

  public static dev(err: any, req: Request, res: Response, next: NextFunction): Response {
    const isValidatorError = err && err.error && err.error.isJoi;
    if (isValidatorError) return this.handleValidatorErrors(err, req, res, next);

    const host = req.get('host');
    const url = req.protocol + '://' + host + req.url;
    const status = err.status || 500;
    const errMsg = {
      status: !err.status && err.message ? 400 : status,
      stack: err.stack,
      code: err.code || (err.err && err.err.errorIdentifier),
      message: err.message || err.err.message,
      type: err.type,
      url,
    };

    logger(`dev:: err: `, err);
    return res.status(errMsg.status).json(errMsg);
  }

  public static prod(err: any, req: Request, res: Response, next: NextFunction): Response {
    const isValidatorError = err && err.error && err.error.isJoi;
    if (isValidatorError) return this.handleValidatorErrors(err, req, res, next);

    const status = err.status || 500;
    const errMsg = {
      status: !err.status && err.message ? 400 : status,
      code: err.code || (err.err && err.err.errorIdentifier),
      message: err.message || err.err.message,
      type: err.type,
    };

    return res.status(errMsg.status).json(errMsg);
  }

  public static handleValidatorErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    const errMsg: IErrorResponse = {
      status: 400,
      type: err.type,
      message: `${err.type} params validation error`,
      detail: err.error && err.error.details,
    };

    if (err && err.code) {
      errMsg.code = err.code;
    }

    return res.status(errMsg.status).json(errMsg);
  }
}
