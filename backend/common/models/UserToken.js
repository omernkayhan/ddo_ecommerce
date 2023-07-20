/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class UserToken extends DataModel {
    static modelName = 'UserToken';
    static attributes = {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        accessToken: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    };
}

module.exports = UserToken;