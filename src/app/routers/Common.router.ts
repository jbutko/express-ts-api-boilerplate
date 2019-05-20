import { Router } from 'express';
import * as validation from 'express-joi-validation';
import { CommonController, commonValidators } from '../components/Common';

export class CommonRouter {
  public router: Router;
  protected commonController: CommonController;
  protected validator: any;

  constructor() {
    this.commonController = new CommonController();
    this.validator = validation({ passError: true });
    this.router = this.initRouter();
  }

  /**
   * Common router
   */
  private initRouter(): Router {
    const router: Router = Router();

    router
      // health check
      .get('/health-check', this.commonController.endpointGetHealthCheck)
      // display user's name
      .post(
        '/display-username',
        this.validator.body(commonValidators.PostDisplayNameSchema),
        this.commonController.endpointPostDisplayName
      );

    return router;
  }
}

export const commonRouter = new CommonRouter();
