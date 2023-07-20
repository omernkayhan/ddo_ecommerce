/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel, sequelize} = require("../db");

class Customer extends DataModel {
    static modelName = 'Customer';
    static attributes = {
        customerCustomData: {
            type: DataTypes.STRING(50)
        }
    };
}

module.exports = Customer;