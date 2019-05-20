import * as debug from 'debug';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { Express, Request, Response, NextFunction } from 'express-serve-static-core';
import { AppRouter } from './App.routes';
import { ErrorHandling } from './core';

const logger = debug('App:src/app/App.ts');

export class App {
  public app: Express;
  protected router: AppRouter;

  constructor() {
    // init express app
    this.app = express();

    // init app router
    this.router = new AppRouter();

    // configure application
    this.config();
  }

  public config(): void {
    // middlewares
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    // app router
    this.app.use('/api/', this.router.getAppRouter());

    // error handling
    this.initErrorHandling(this.app);
  }

  public setPort(port: number): void {
    this.app.set('port', port);
  }

  private initErrorHandling(app: Express): void {
    // catch 404
    app.use((req: Request, res: Response, next: NextFunction) => {
      logger({
        status: 404,
        title: 'Not Found',
        message: 'Route not found',
        url: req.url,
      });
      ErrorHandling.routeNotFound(req, res, next);
    });

    // dev error handling with stack traces
    if (app.get('env') === 'development') {
      app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger('initErrorHandling:: err', err);
        ErrorHandling.dev(err, req, res, next);
      });
    }

    // prod error handling without stack traces
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      logger('initErrorHandling:: err', err);
      ErrorHandling.prod(err, req, res, next);
    });
  }
}
