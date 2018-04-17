# TallyGo Example Server

A very simple Node.js server that acts as a stand-in for your custom server backend, and demonstrates how you could exchange data between your mobile app and your own server. It implements basic functionality as shown in our mobile app usage examples. [Check them out!](https://tallygo.com/docs)

## Prerequisites

You need to have [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com) installed already.

## First-Time Setup

Before running the server for the first time, execute this command:

    npm install

## Configuration

By default, the server runs on port 3200. To use a different port, pass the `PORT` environment variable.

## Running the Server

To start the server:

    ./bin/www

To exit the server, type Ctrl-C.

## Development

Most of the interesting stuff is in the `routes` folder, particularly `drivers.js`.
