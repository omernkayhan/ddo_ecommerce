/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Currency = require("./Currency");
const Role = require("./Role");

class Permission extends DataModel {
    static modelName = 'Permission';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.TEXT
        }
    };

    static options = {
        timestamps: false
    };
}

module.exports = Permission;