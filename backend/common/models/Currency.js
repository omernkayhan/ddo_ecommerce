/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class Currency extends DataModel {
    static modelName = 'Currency';
    static attributes = {
        code: {
            type: DataTypes.STRING(3),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    };

    static options = {
        timestamps: false
    };
}

module.exports = Currency;