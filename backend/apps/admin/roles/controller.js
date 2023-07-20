/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../../common/Controller");
const Role = require("../../../common/models/Role");
const Permission = require("../../../common/models/Permission");
const {ROLE} = require("../../../common/serializer");

class RoleController extends Controller {
    defaultModel = Role;

    listPayload = {properties: ['id', 'code', 'name', 'description', ['permissions', {type: 'array', uniqueItems: true, items: {type: "number"}}]], additionalProperties: false};
    createPayload = {
        properties: ['code', 'name', 'description', ['permissions', {type: 'array', uniqueItems: true, items: {type: "number"}}]],
        additionalProperties: false,
        required: ['code', 'name', 'description']
    };
    updatePayload = {properties: ['code', 'name', 'description', ['permissions', {type: 'array', uniqueItems: true, items: {type: "number"}}]], additionalProperties: false};

    detailSerializer = ROLE.INCLUDE_WITH_PERMISSION;

    create(req, res) {
        super.create(req, res, async (role) => {
            await role.setPermissions(req.body.permissions ?? []);
        });
    }

    update(req, res) {
        super.update(req, res, async (role) => {
            await role.setPermissions(req.body.permissions ?? []);
        });
    }

}

module.exports = RoleController;