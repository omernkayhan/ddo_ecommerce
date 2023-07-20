/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Country = require("./Country");
const Currency = require("./Currency");

class PaymentMethod extends DataModel {
    static modelName = 'PaymentMethod';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        logo: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT
        },
        minPrice: {
            type: DataTypes.FLOAT
        },
        maxPrice: {
            type: DataTypes.FLOAT
        },
        fee: {
            type: DataTypes.FLOAT,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };
    static options = {timestamps: false};
}

module.exports = PaymentMethod;