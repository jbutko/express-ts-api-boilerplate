import * as debug from 'debug';
import { Request, Response, NextFunction } from 'express-serve-static-core';

const logger = debug('app:src/app/components/Common/Common.controller.ts');

/**
 * Example `Common` controller
 */
export class CommonController {
  /**
   * API health check endpoint
   * GET /api/common/healt-check
   */
  public endpointGetHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ data: 'OK' });
    } catch (err) {
      logger('endpointGetHealthCheck:: error: ', err);
      next(err);
    }
  };

  /**
   * POST Show user's name
   * POST /api/common/name
   */
  public endpointPostDisplayName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { name },
      } = req;
      res.status(200).json({ data: `Your name is ${name}. Ola!` });
    } catch (err) {
      logger('endpointPostDisplayName:: error: ', err);
      next(err);
    }
  };
}
