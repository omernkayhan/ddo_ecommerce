/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");
const bcrypt = require("bcrypt");
const {BCRYPT_SALT_ROUNDS} = require("../config");

class ConfigurationItems extends DataModel {
    static modelName = 'ConfigurationItems';
    static attributes = {
        value: {
            type: DataTypes.STRING(100),
        }
    };
}

module.exports = ConfigurationItems;