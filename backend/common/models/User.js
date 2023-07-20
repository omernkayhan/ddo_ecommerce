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

class User extends DataModel {
    static modelName = 'User';
    static attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            set(password) {
                const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
                password = bcrypt.hashSync(password, salt);
                this.setDataValue('password', password);
            }
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(14)
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    };
}

module.exports = User;