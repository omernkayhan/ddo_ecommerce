/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class OrderItem extends DataModel {
    static modelName = 'OrderItem';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: {
            type: DataTypes.VIRTUAL,
            get(){
                return this.quantity * this.price;
            }
        },
        shippingTrackingNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    };
}

module.exports = OrderItem;