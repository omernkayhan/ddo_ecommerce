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

class Listing extends DataModel {
    static modelName = 'Listing';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: {
            type: DataTypes.FLOAT,
            nullable: false
        },
        listingStartDateTime: {
            type: DataTypes.DATE,
        }
    };
}

module.exports = Listing;