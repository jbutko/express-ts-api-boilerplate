# Express Typescript API Boilerplate

Simple Express API boilerplate built with Typescript.

## Technologies/Packages used

Typescript, ES6, Express, TSLint, Dotenv, Prettier, Joi, Nodemon

## Installation

```
git clone git@github.com:jbutko/express-ts-api-boilerplate.git
cd express-ts-api-boilerplate
yarn install // or npm install
```

## Scripts

`npm run dev`

- run the app in development mode, app will be reloaded on file changes

`npm run start`

- start the app in non-reloadable mode

`npm run build`

- build the app

`npm run lint`

- check typescript errors via TSLint

`npm run lint:fix`

- check and fix typescript errors via TSLint

`npm run format:lint:fix`

- check and fix typescript errors via TSLint and correct formatting errors via Prettier

`npm run format:prettier`

- check for formatting errors via Prettier

`npm run format:prettier:fix`

- fix formatting errors via Prettier

## Example of project directory structure

```
│   index.ts                          // Main entry point: server and express app initialization
│
├───app                               // App folder
│   │   App.routes.ts                 // Main express router: individual routers from `app/routers` folder are imported here
│   │   App.ts                        // Express app config: middlewares, router initialization, error handling initialization
│   │
│   ├───components                    // All components (entities) goes here
│   │   └───Common                    // Common component
│   │           Common.controller.ts  // API controller for `Common` component: API endpoint handlers goes here, keep it simple!
│   │           Common.validators.ts  // Joi validation schemas. Imported in `app/routers` files.
│   │           Common.interface.ts   // Typescript interfaces/enums for `Common` component
│   │           Common.db.ts          // Database access related code
│   │           Common.service.ts     // Generic functions related to data processing or stuff that do not need db access
│   │           Common.middleware.ts  // Express middleware functions, for example user auth verification etc. Imported in `app/routers` files.
│   │           index.ts              // Public API of `Common` component: CommonController, commonValidators etc.
│   │
│   ├───core                          // Core components: common logic that is used in more than one place of the app
│   │       Env.ts                    // Environment settings configuration (dotenv)
│   │       ErrorHandling.ts          // Express error handler functions for prod/dev/404
│   │       index.ts                  // Public API of `core` folder: ENV, ErrorHandling etc.
│   │
│   └───routers                       // Routers for individual components from `components` folder
│           Common.router.ts          // API Endpoint handlers for `Common` controller
│           index.ts                  // All exported routers
│
└───types                             // Typescript definition files goes here
        types.d.ts                    // Generic typescript definition file
```

Copyright (C) 2019 Jozef Butko
https://www.jozefbutko.com
