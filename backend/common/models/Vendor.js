/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");
const Role = require("./Role");

class Vendor extends DataModel {
    static modelName = 'Vendor';
    static attributes = {
        vendorCustomData: {
            type: DataTypes.STRING(50)
        }
    };
    static options = {timestamps: false};
}

module.exports = Vendor;