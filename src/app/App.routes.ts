import { Router } from 'express';
import * as routers from './routers';

export class AppRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  /**
   * Main app router
   */
  public getAppRouter(): Router {
    // common routes
    this.router.use('/common', routers.commonRouter.router);
    return this.router;
  }
}
