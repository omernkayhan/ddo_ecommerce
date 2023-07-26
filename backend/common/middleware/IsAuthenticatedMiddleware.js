const jwt = require("jsonwebtoken");
const {logger} = require("./logger");
const UserToken = require("../models/UserToken");

module.exports = {
    authenticateCheck: (requestData) => (req, res, next) => {

        const prefix = requestData[0].substring(1).replaceAll('/', '.');
        const permissionName = prefix + ((prefix !== '') ? '.' : '') + requestData[1];
        logger.info(`'${req.method}' request to '${req.url}', permissionCode: '${permissionName}', from '${req.headers['x-forwarded-for'] || req.socket.remoteAddress}'`);

        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Auth headers not provided in the request.'
                }
            });
        }

        if (!authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Invalid auth mechanism.'
                }
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Bearer token missing in the authorization headers.'
                }
            })
        }

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, user) => {
            if (err || await UserToken.findOne({where: {accessToken: token}}) === null) {
                return res.status(403).json({
                    status: false,
                    error: {
                        message: 'Invalid access token provided, please login again.'
                    }
                });
            }

            req.user = user;


            if (false && (req.user.role.code !== 'sysadmin' && !req.user.role.permissions.includes(permissionName))) {
                return res.status(403).json({
                    status: false,
                    error: {
                        message: `You do not have permission to access [${req.method}] ${req.url}. Permission code: '${permissionName}'`
                    }
                });
            }

            next();
        });
    }
};