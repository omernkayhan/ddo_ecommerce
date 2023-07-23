/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Country = require("./Country");
const Currency = require("./Currency");

class Payment extends DataModel {
    static modelName = 'Payment';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        result: {
            type: DataTypes.ENUM(['success', 'error']),
            allowNull: false,
        },
        paymentId: {
            type: DataTypes.STRING(100),
        },
        paid: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    };
}

module.exports = Payment;