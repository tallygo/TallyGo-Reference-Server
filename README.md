# TallyGo Reference Server

A very simple Node.js server that acts as a stand-in for your custom server backend, and demonstrates how you could exchange data between your mobile app and your own server. It implements a basic version of the server-side functionality as used in our [iOS Reference App](https://github.com/tallygo/TallyGo-iOS-Reference-App) and [Android Reference App](https://github.com/tallygo/TallyGo-Android-Reference-App).

## Prerequisites

You need to have [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com) installed already.

## Setup

Before running the server for the first time, execute this command:

    npm install

You may also need to do this again whenever you do a `git pull`.

## Configuration

By default, the server runs on port 3200. To use a different port, pass the `PORT` environment variable.

## Running the Server

To start the server, run this command:

    npm start

To exit the server, type Ctrl-C.

## Development

Most of the interesting stuff is in the `routes` folder, particularly `drivers.js`.

## Triggering Server to send fake WebSocket events for multiple vehicle demo

With the server running in another terminal window:

    curl -X GET http://localhost:3200/multiple_vehicles/send_events

The interval between WebSocket message broadcasts can be changed by editing
the `eventBroadcastInterval` constant in the `routes/multiple_vehicles.js` file
