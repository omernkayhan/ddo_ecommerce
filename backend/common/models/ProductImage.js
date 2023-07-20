/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");
const bcrypt = require("bcrypt");
const {BCRYPT_SALT_ROUNDS} = require("../config");

class ProductImage extends DataModel {
    static modelName = 'ProductImage';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    };
}

module.exports = ProductImage;