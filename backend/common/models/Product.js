/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");
const bcrypt = require("bcrypt");

class Product extends DataModel {
    static modelName = 'Product';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sku: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        shortDescription: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sefLink: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        online: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };
}

module.exports = Product;