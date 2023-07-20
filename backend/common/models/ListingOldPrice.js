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

class ListingOldPrice extends DataModel {
    static modelName = 'ListingOldPrice';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: {
            type: DataTypes.FLOAT,
            nullable: false
        }
    };
}

module.exports = ListingOldPrice;