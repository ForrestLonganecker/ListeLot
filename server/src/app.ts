export {};
const express = require('express');
const app: Express.Application = express();

const mainConfig = require('./config/main-config');
const routeConfig = require('./config/route-config');

mainConfig.init(app, express);
routeConfig.init(app);

module.exports = app;
