/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Permission = require("./Permission");

class Role extends DataModel {
    static modelName = 'Role';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.TEXT
        }
    };

    static options = {
        timestamps: false
    };
}

module.exports = Role;