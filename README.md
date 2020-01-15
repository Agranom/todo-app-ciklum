# Todo App

Simple todo app based on NodeJs and Angular 8

## Demo

http://todo-web.us-east-2.elasticbeanstalk.com/

## Before start

* Add `.env` file to `service-auth` root directory and set value to `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

## Local start

### Start all applications

To run applications locally:

* Run command `docker-compose up -d` from a root directory
* Open `http://loclhost:8000` in your browser

### Start single application

To run applications separately:

* Navigate to app folder
* Run command `npm run docker:build`
* Run command `npm run docker:run`

## Development

It's recommended to create a feature branch from `master` to make changes. 

* Navigate to app folder
* Run command `npm run dev` to start application in watch mode

## Testing

* Navigate to app folder
* Run command `npm test` for single testing
* Run command `npm test:watch` to start tests in watch mode

## Deployment

Apps are running on AWS. To deploy your changes to AWS:

* Push your changes to `github` and make pull request from your feature branch to `master`
* Your changes will be deployed to AWS ones changes will be merged into master and all jobs are passed
