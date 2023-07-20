/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {DataTypes} = require("sequelize");
const {DataModel} = require("../db");
const Role = require("./Role");

class ProductCategory extends DataModel {
    static modelName = 'ProductCategory';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        sefLink: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };

    static options = {
        timestamps: false,
        hierarchy: true
    };
}

module.exports = ProductCategory;