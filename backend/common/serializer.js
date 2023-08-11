/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const Role = require("./models/Role");
const User = require("./models/User");
const Permission = require("./models/Permission");

const PERMISSION_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'code', 'name']
};

const PERMISSION = {
    INCLUDE_BASIC_LEVEL: {model: Permission, attributes: PERMISSION_ATTRIBUTES.BASIC_LEVEL}
};

const ROLE_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'code', 'name']
};

const ROLE = {
    INCLUDE_BASIC_LEVEL: {model: Role, attributes: ROLE_ATTRIBUTES.BASIC_LEVEL},
    INCLUDE_WITH_PERMISSION: {
        model: Role,
        attributes: ROLE_ATTRIBUTES.BASIC_LEVEL,
        include: {...PERMISSION.INCLUDE_BASIC_LEVEL, as: 'permissions', through: {attributes: []}}
    }
};

const USER_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'name', 'surname'],
    HIDE_PASSWORD: {exclude: ['password']},
};

const USER = {
    INCLUDE_BASIC_LEVEL: {
        model: User,
        attributes: USER_ATTRIBUTES.BASIC_LEVEL
    },
    INCLUDE_WITHOUT_ROLE: {
        model: User,
        attributes: USER_ATTRIBUTES.HIDE_PASSWORD,
    },
    INCLUDE_WITH_ROLE: {
        model: User,
        attributes: {exclude: ['password', 'roleId']},
        include: {...ROLE.INCLUDE_BASIC_LEVEL, as: 'role'}
    },
    INCLUDE_WITH_ROLE_AND_PERMISSIONS: {
        model: User,
        attributes: USER_ATTRIBUTES.HIDE_PASSWORD,
        include: ROLE.INCLUDE_WITH_PERMISSION
    },
    INCLUDE_VENDOR_BASIC: {
        model: User,
        attributes: [...USER_ATTRIBUTES.BASIC_LEVEL, 'email', 'phone', 'active', 'createdAt', 'updatedAt'],
    },
};
module.exports = {
    PERMISSION_ATTRIBUTES, PERMISSION,
    ROLE_ATTRIBUTES, ROLE,
    USER_ATTRIBUTES, USER
};