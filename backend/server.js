/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

require('dotenv').config();

const Express = require("express");
const app = Express();
const cors = require("cors");
const compression = require('compression');

const {syncDB} = require("./common/sync");

const {sequelize, DataModel} = require('./common/db');
const {DataTypes} = require("sequelize");

const {authenticateCheck} = require("./common/middleware/IsAuthenticatedMiddleware");
const {success, error} = require("./common/Response");
const {initRouters} = require("./common/Routers");
const test = require("./test");
const {logger} = require("./common/middleware/logger");
const {generate} = require("./common/middleware/ListEngine");
const path = require("path");
const Role = require("./common/models/Role");
const User = require("./common/models/User");

syncDB(sequelize).then(async () => {

    if (await Role.count({where: {code: 'sysadmin'}}) === 0) {
        const role = await Role.create({code: 'sysadmin', name: 'System Admin', description: 'System Admin'});
        if (await User.count() === 0) {
            await User.create(
                {
                    username: 'sysadmin',
                    password: '1234',
                    name: 'System',
                    surname: 'Admin',
                    email: 'admin@system',
                    phone: 'phone',
                    active: true,
                    roleId: role.id,
                }
            );

        }
    }

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

    app.listen(parseInt(process.env.APP_PORT), () => {
    });

}).catch((e) => {
    console.log(e)
    logger.error("App Error: " + e.toString());
})