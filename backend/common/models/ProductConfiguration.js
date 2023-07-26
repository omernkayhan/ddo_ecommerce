/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");
const bcrypt = require("bcrypt");
const {PRODUCT} = require("../config");

class ProductConfiguration extends DataModel {
    static modelName = 'ProductConfiguration';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            nullable: false
        },
        type: {
            type: DataTypes.ENUM(PRODUCT.CONFIGURATION_TYPE_OPTIONS),
            nullable: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };
}

module.exports = ProductConfiguration;