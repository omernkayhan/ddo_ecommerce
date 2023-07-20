/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class Store extends DataModel {
    static modelName = 'Store';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        storeName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.TEXT,
        },
        addressCity: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        taxId: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        taxOffice: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };
}

module.exports = Store;