"use strict";
require('dotenv').config();
var app = require('./app');
var http = require('http');
var port = normalizePort(process.env.PORT || '4000');
var server = http.createServer(app);
server.listen(port);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
server.on('listening', function () {
    console.log("ListeLot listening on port " + port);
});
