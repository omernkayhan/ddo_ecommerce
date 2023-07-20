/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class Discount extends DataModel {
    static modelName = 'Discount';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(['fixed', 'proportional']),
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };

    static options = {
        timestamps: false
    };
}

module.exports = Discount;