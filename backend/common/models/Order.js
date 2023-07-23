/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const {ORDER} = require("../config");

class Order extends DataModel {
    static modelName = 'Order';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(ORDER.STATUS_OPTIONS),
            allowNull: false
        },
        canceled: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.status === 'canceled';
            }
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    };
}

module.exports = Order;