/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const User = require("../../common/models/User");
const Role = require("../../common/models/Role");
const bcrypt = require("bcrypt");
const {BCRYPT_SALT_ROUNDS} = require("../../common/config");
const Permission = require("../../common/models/Permission");
const {error} = require("../../common/Response");
const {generateAccessToken, generateRefreshToken} = require("../../common/middleware/Token");
const {ROLE} = require("../../common/serializer");
const UserToken = require("../../common/models/UserToken");

class AuthController extends Controller {
    defaultModel = User;

    async register(req, res) {
        const payload = req.body;

        const customerRole = await Role.findOne({where: {code: 'sysadmin'}});

        if (await User.count({
            where: {
                username: payload.username
            }
        })) {
            return res.status(400).json({
                status: false,
                error: {
                    message: `Username already taken: \`${payload.username}\`.`,
                },
            });
        }

        User.create({
            ...payload
        }).then((user) => {
            user.setRole(customerRole);
            return res.status(200).json({
                status: true,
                data: {
                    id: user.id
                }
            });
        }).catch((e) => {
            return res.status(500).json({
                status: false,
                error: e,
            });
        });

    }
    async login(req, res) {
        const {username, password} = req.body;

        const user = User.findOne({where: {username}, include: {...ROLE.INCLUDE_WITH_PERMISSION, as: 'role'}}).then(async (user) => {

            if (!user) {
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username: \`${username}\`.`,
                    },
                });
            }

            if (user.active === false) {
                error(res, `User is not active with username: ${username}`);
            }

            bcrypt.compare(password, user.password, async function (err, result) {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Password resolve error.`,
                        },
                    });
                }

                if (!result) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Password Incorrect.`,
                        },
                    });
                }

                user = user.toJSON();
                const userData = {
                    id: user.id,
                    role: {
                        id: user.role.id,
                        code: user.role.code,
                        permissions: user.role.permissions.map((permission) => {
                            return permission.code;
                        }),
                    }
                };

                const accessToken = generateAccessToken(userData);
                const refreshToken = generateRefreshToken(userData);

                await (await UserToken.findByPk(user.id))?.destroy();

                await UserToken.create({
                    userId: user.id,
                    accessToken,
                    refreshToken
                });

                return res.status(200).json({
                    status: true,
                    data: {
                        accessToken,
                        refreshToken
                    }
                });

            });

        });

    }
}

module.exports = AuthController;