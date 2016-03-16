# wanna-drink-webapp

The frontend single page application for Wanna Drink!

For info on what technical decisions were made, [see this doc](./doc/tech-decisions.md).

For more about the app from a feature perspective, [see this doc](./doc/feature-set.md).

## Prerequisites
npm version > 2.14.x < 3

## Install
`npm install`

## Update
`npm update`

## Start the local server
`npm start`

This will start a local node server and launch the app in your favorite default browser to `http://wanna-drink.localtest.me:3000`.

## Backend
The local server when making any calls to `/api/*` will proxy the request to `http://wanna-drink-api.localtest.me:5000` which is our python backend for Wanna Drink. For that project [see this repo](https://github.com/c-h-russell-walker/wanna-drink-api). 


