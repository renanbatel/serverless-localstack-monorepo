# Serverless Localstack Monorepo

A monorepo development environment for AWS serverless applications.

Build your serverless application for AWS using [Serverless Framework](https://github.com/serverless/serverless) and deploy it locally for testing using [LocalStack](https://github.com/localstack/localstack).

## How it works

This project setup is very similar to the standard way of developing serverless applications using the Serverless Framework, the main differences are that it's a monorepo and it's possible to deploy it to LocalStack (so you can test all its functions and all the event triggers locally).

The project is written using TypeScrip and the bundling is handled by Webpack. The bundled files are placed in the `.webpack` folder, in each functions package. This folder is then mounted into the LocalStack container, so the lambda service can use it. If these bundled files are updated, the lambda function is also updated, so you don't need redeploy it in every code change.

There are some bugs that eventually pop up when the code is updated and rebuilt into the mounted folders. The bundling is not happening in the best way, so it needs to be improved yet to resolve those problems.

## Requirements

Install all [LocalStack requirements](https://github.com/localstack/localstack#requirements), including its CLI.

## Running the project

Remove any existing `localstack/localstack` image to get its `latest` version.

```sh
$ docker rmi $(docker images localstack/localstack -q)
```

Install the project dependencies and then run `local:dev`, the script will build the project, start LocalStack container (its env variables are all placed in `.conf`), deploy the resources locally and then watch for changes in the functions files.

```sh
$ yarn # npm i
$ yarn local:dev # npm run local:dev
```

## License

[MIT](https://github.com/renanbatel/serverless-localstack-monorepo/blob/master/LICENCE) © Renan Batel Rodrigues
