/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");
const bcrypt = require("bcrypt");
const {BCRYPT_SALT_ROUNDS, PRODUCT} = require("../config");

class ProductConfigurationValue extends DataModel {
    static modelName = 'ProductConfigurationValue';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING(50),
            nullable: false
        }
    };
}

module.exports = ProductConfigurationValue;