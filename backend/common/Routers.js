/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const test = require("../test");
const {success} = require("./Response");
const {authenticateCheck} = require("./middleware/IsAuthenticatedMiddleware");
const multer = require("multer");
const {uuid} = require('uuidv4');

const Controllers = require("./Controllers");
const AuthRouter = require("../apps/auth/router");
const RoleRouter = require("../apps/admin/roles/router");
const PermissionRouter = require("../apps/admin/permissions/router");
const UserRouter = require("../apps/admin/users/router");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + uuid() + '.' + file.originalname.split('.').slice(-1)[0]);
    }
})

const upload = multer({storage: storage});

module.exports = {
    routers: {},
    initRouters: (app) => {
        return this.routers = {
            testRouter: app.get('/test', (req, res) => {
                test();
                return success(res, null);
            }),
            whoamiRouter: app.get('/whoami', [authenticateCheck(['', 'whoami'])], (req, res) => {
                return success(res, req.user);
            }),
            authRouter: new AuthRouter('/auth', Controllers.AuthController, app),
            roleRouter: new RoleRouter('/admin/roles', Controllers.RoleController, app),
            permissionRouter: new PermissionRouter('/admin/permissions', Controllers.PermissionController, app),
            userRouter: new UserRouter('/admin/users', Controllers.UserController, app),
        };
    },
    Admin: {
        RoleRouter,
        PermissionRouter,
        UserRouter
    },
    AuthRouter,
};