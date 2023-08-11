/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const AuthController = require("../apps/auth/controller");
const RoleController = require("../apps/admin/roles/controller");
const PermissionController = require("../apps/admin/permissions/controller");
const UserController = require("../apps/admin/users/controller");
const DocumentRequestController = require("../apps/documents/documentRequests/controller");
/* NEW CONTROLLER REQUIRE */

module.exports = {
    AuthController,
    RoleController,
    PermissionController,
    UserController,
	DocumentRequestController,
	/* NEW CONTROLLER EXPORT */
};