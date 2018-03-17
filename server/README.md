# SpamDB - Server

## Setup

In order to setup the SpamDB server, ensure you have the following pre-requisities installed:
- MongoDB
- Node >8
- Yarn installed globally
- PM2 installed globally

Then, run the following commands...
1. `cp config.example.json config.json`
1. Edit `config.json` accordingly.
1. `yarn` - to install the NPM dependencies.
1. `yarn generate` - to generate the routes/documentation for the API.
1. `pm2 start pm2.json` - to boot up the API.
