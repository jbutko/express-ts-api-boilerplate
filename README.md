# Express TypeScript API Boilerplate

Simple Express API boilerplate built with TypeScript.

### Motivation

Main goal was to create a boilerplate for NodeJS projects built with TypeScript without having to spend long hours to setup development tools, build, linting and formatting tasks.

### Technologies and Packages used

TypeScript, ES6, Express, TSLint, Dotenv, Prettier, Joi, Nodemon

### Installation

```
git clone git@github.com:jbutko/express-ts-api-boilerplate.git
cd express-ts-api-boilerplate
yarn install // or npm install
```

### Scripts

`yarn run dev`

- run the app in development mode, app will be reloaded on file changes

`yarn run start`

- start the app in non-reloadable mode

`yarn run build`

- build the app

`yarn run lint`

- check typescript errors via TSLint

`yarn run lint:fix`

- check and fix typescript errors via TSLint

`yarn run format`

- check for formatting errors via Prettier

`yarn run format:fix`

- fix formatting errors via Prettier

`yarn run format:lint:fix`

- check and fix typescript errors via TSLint and correct formatting errors via Prettier

### Project directory structure example

```

│   .editorconfig                         // https://editorconfig.org/
│   .env                                  // Base environment variables goes here. BEWARE: This one is commited in the repo, do not store sensitive variables here.
│   .env.local                            // Sensitive ENV variables goes here. Overrides variables from `/.env`. BEWARE: This one is not commited in the repo.
│   .gitignore                            // Git ignored files
│   .prettierignore                       // Prettier ignored files
│   .prettierrc                           // Prettier config file: no more tab/space bullshit with your collegues
│   LICENSE                               // License file, MIT of course
│   nodemon.json                          // Nodemon config file
│   package.json                          // App dependencies, project information and stuff...
│   pm2-process.json                      // PM2 process config file (start the app with command `pm2 start pm2-process.json`)
│   README.md                             // Project Readme
│   tsconfig.json                         // TypeScript config file
│   tslint.json                           // TypeScript linting config file
│   yarn.lock                             // Yarn lockfile => https://yarnpkg.com/blog/2016/11/24/lockfiles-for-all/
│
└───src                                   // App root folder
    │   index.ts                          // Main entry point: http server and express app initialization
    │
    ├───app                               // App folder
    │   │   App.routes.ts                 // Main express router: individual routers from `app/routers` folder are imported here
    │   │   App.ts                        // Express app config: middlewares, router initialization, error handling initialization
    │   │
    │   ├───components                    // All components (entities) goes here
    │   │   └───Common                    // Common component example
    │   │           Common.controller.ts  // API controller for `Common` component: API endpoint handlers goes here, keep it simple!
    │   │           Common.validators.ts  // Joi validation schemas. Imported in `app/routers` files.
    │   │           Common.interface.ts   // TypeScript interfaces/enums for `Common` component
    │   │           Common.db.ts          // Database access related code
    │   │           Common.service.ts     // Generic functions related to data processing or stuff that do not need db access
    │   │           Common.middleware.ts  // Express middleware functions: for example user auth token verification etc. Imported in `app/routers` files.
    │   │           index.ts              // Public API of `Common` component: CommonController, commonValidators etc.
    │   │
    │   ├───core                          // Core components: common logic that is used in more than one place of the app
    │   │       Env.ts                    // Environment settings configuration through dotenv - variables from `/.env` and `./env.local` will be initialized here.
    │   │       ErrorHandling.ts          // Express error handler functions for prod/dev
    │   │       Dates.ts                  // All dates/times related functions
    │   │       index.ts                  // Public API of `core` folder: ENV, ErrorHandling etc.
    │   │
    │   └───routers                       // Routers for individual components from `components` folder
    │           Common.router.ts          // API Endpoint handlers for `Common` controller
    │           index.ts                  // All exported routers
    │
    └───types                             // TypeScript definition files goes here
            types.d.ts                    // Generic typescript definition file

```

### Debugging

If you need to debug some of your code during development, it's very easy. Open following URL in Chrome: `chrome://inspect/#devices`. Click on `Open dedicated DevTools for Node` => DevTools should open. Use `Ctrl + P` shortcut to find the file you need, for example `Common.controller.ts`. After adding a breakpoint the TypeScript file should be opened directly in devtools.

**Note:** If inspect mode does not work for you, you need to configure ports by clicking on `Configure` button in `chrome://inspect/# devices`. The websocket port through which the inspect mode works is displayed during app launch in the command line ("Debugger listening on ws://127.0.0.1:9229/..."). In this example you need to add `localhost:9229` in `Configure` settings.

### API Endpoints params validation

To validate input params sent from API user [Joi](https://github.com/hapijs/joi) package is used. At first you need to define validation schemas ([example](https://github.com/jbutko/express-ts-api-boilerplate/blob/master/src/app/components/Common/Common.validators.ts)). The next step is to import schemas in your router, instantite Joi validator and use it as middleware. This way you can separate params validation logic out of controllers. Check the [example](https://github.com/jbutko/express-ts-api-boilerplate/blob/master/src/app/routers/Common.router.ts).

### Production deployment example

Clone the repo on any unix (cloud) server. Make a build of the app:

```
yarn run build
```

Install [pm2](https://github.com/Unitech/pm2) process manager:

```
yarn add -g pm2
```

Start the app:

```
pm2 start pm2-process.json
```

App will be started in daemon mode (background). To check the logs of the app issue following command:

```
pm2 logs nameOfTheAppFromPm2
```

You can find the name of the app in `pm2-process.json` file.

<br />
<br />

Copyright (C) 2019 Jozef Butko
[www.jozefbutko.com](https://www.jozefbutko.com)
