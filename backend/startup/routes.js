module.exports = (app) => {

    const apiRoutes = require('../routes/index');
    const errorMiddleware = require('../middleware/error');

    app.use('/', apiRoutes);

    app.use(errorMiddleware);

};