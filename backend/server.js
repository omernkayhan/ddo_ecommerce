/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const Express = require("express");
const app = Express();
const cors = require("cors");
const compression = require('compression');

const {syncDB} = require("./common/sync");

const {APP_PORT, DEFAULT_PAGE_ITEM_COUNT} = require("./common/config");

const {sequelize, DataModel} = require('./common/db');
const {DataTypes} = require("sequelize");

const {authenticateCheck} = require("./common/middleware/IsAuthenticatedMiddleware");
const {success, error} = require("./common/Response");
const {initRouters} = require("./common/Routers");
const test = require("./test");
const {logger} = require("./common/middleware/logger");
const {generate} = require("./common/middleware/ListEngine");
const path = require("path");

syncDB(sequelize).then(() => {

    app.use(cors());
    app.use(Express.json());
    app.use(compression());
    app.use(generate);

    app.use('/public', Express.static(path.join(__dirname, 'public')));

    logger.info('App Ready!');

    initRouters(app);

    app.use(function (req, res, next) {
        res.status(404);
        error(res, `Invalid Request: Cannot ${req.method} ${req.path}`, {}, 404);
    });

    app.listen(APP_PORT, () => {});

}).catch((e) => {
    console.log(e)
    logger.error("App Error: " + e.toString());
})