## Prerequisites

NodeJS
https://nodejs.org/en/

Typescript
https://www.typescriptlang.org/

# Getting started

Clone this repo. Copy `.env` to `.env.development`. Edit the env file and pass in your credentials

## Installation

Install dependencies (preferred: pnpm)

```sh
 yarn install
```

## Scripts

-   `yarn start` - Start application
-   `yarn start:dev` - Start application in watch mode
-   `yarn test` - run Jest test runner
-   `yarn start:prod` - Build application
-   `yarn mikro-orm` - Run MikroORM CLI
-   `yarn nest` - Run NestJS CLI

## Start development environment

- `NODE_ENV=development yarn start:dev` start app with hot module reload.
- Test api by browsing to `http://localhost:[port]/v1/user`
- View automatically generated swagger api docs by browsing to `http://localhost:[port]/docs`
* Port default is `3000` you can change it in .env file