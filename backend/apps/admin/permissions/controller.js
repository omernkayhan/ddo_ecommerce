/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../../common/Controller");
const Permission = require("../../../common/models/Permission");

class PermissionController extends Controller {
    defaultModel = Permission;
    
    createPayload = {
        properties: ['code', 'name', 'description'],
        additionalProperties: false,
        required: ['code', 'name', 'description']
    };
    updatePayload = {properties: ['code', 'name', 'description'], additionalProperties: false};
}

module.exports = PermissionController;