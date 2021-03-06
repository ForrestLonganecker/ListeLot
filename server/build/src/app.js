"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var mainConfig = require('./config/main-config');
var routeConfig = require('./config/route-config');
mainConfig.init(app, express);
routeConfig.init(app);
module.exports = app;
