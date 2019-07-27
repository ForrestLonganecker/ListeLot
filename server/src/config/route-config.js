// File to import and initialize all routes for the api

module.exports = {
  init(app){
    const staticRoutes = require('../routes/static');
    const userRoutes = require('../routes/users');
    const listRoutes = require('../routes/lists');
    const listItemRoutes = require('../routes/listItems');

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(listRoutes);
    app.use(listItemRoutes);
  }
};