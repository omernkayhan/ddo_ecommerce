/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../../common/Controller");
const User = require("../../../common/models/User");
const Role = require("../../../common/models/Role");
const bcrypt = require("bcrypt");
const {BCRYPT_SALT_ROUNDS} = require("../../../common/config");
const {USER_ATTRIBUTES, USER} = require("../../../common/serializer");

class UserController extends Controller {
    defaultModel = User;
    

    createPayload = {
        properties: [['role', {type: 'number'}], 'username', 'password', 'name', 'surname', 'email', 'phone', 'active'],
        additionalProperties: false,
        required: ['role', 'username', 'password', 'name', 'surname', 'email']
    };
    updatePayload = {
        properties: [['role', {type: 'number'}], 'password', 'name', 'surname', 'email', 'phone', 'active'],
        additionalProperties: false
    };
    listSerializer = {attributes: USER_ATTRIBUTES.HIDE_PASSWORD};
    detailSerializer = USER.INCLUDE_WITH_ROLE;

    create(req, res) {
        super.create(req, res, async (role) => {
            await role.setRole(req.body.role);
        });
    }

    update(req, res) {
        super.update(req, res, async (role) => {
            await role.setRole(req.body.role);
        });
    }

}

module.exports = UserController;