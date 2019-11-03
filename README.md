# Chatee API built with express and typescript.

> Node.js Express API with TypeScript 3. Supports MongoDB

## Description

This API supports the react native application chatee.

### Documentation

View the API documentation [here](https://chatee-api.azurewebsites.net/docs/).

### Features

##### Authentication:

- jwt authentication

##### Session Storage:

- MongoDB
- Redis

##### Integration testing

- mocha
- chai
- supertest

## Requirements

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## Running the API

### Development

To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:

```
nodemon
```

Start the application in production env:

Install ts pm2 and typescript compiler:

```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:

```
pm2 start ./src/index.ts -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode

### Testing

To run integration tests:

```bash
npm test
```

## Set up environment

In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. [Read more about OAuth2.0](https://alexbilbie.com/guide-to-oauth-2-grants/)

## Swagger

```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```
