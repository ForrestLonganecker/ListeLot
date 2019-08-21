"use strict";
// File to import and initialize all routes for the api
module.exports = {
    init: function (app) {
        var staticRoutes = require('../routes/static');
        var userRoutes = require('../routes/users');
        var listRoutes = require('../routes/lists');
        var listItemRoutes = require('../routes/listItems');
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(listRoutes);
        app.use(listItemRoutes);
    }
};
