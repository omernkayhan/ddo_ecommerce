/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {Sequelize, Model} = require("sequelize");
const {options} = require("pg/lib/defaults");
const {Logger} = require("sequelize/lib/utils/logger");
const sequelize = new Sequelize('postgres://ddo_ecommerce_backend:1234@localhost:5432/ddo_ecommerce', {logging: true, force: false});

class DataModel extends Model{

    static modelName = 'Model';
    static attributes = {};
    static options = {};

    static listPayload = {};
    static createPayload = {};
    static updatePayload = {};

    static async init() {
        await super.init(this.attributes, {
            sequelize,
            modelName: this.modelName,
            ...this.options
        });
        return this;
    }

    static async list(search){
        return await this.findAndCountAll(search);
    }

    static async get(id, attributes = {}){
        return await this.findByPk(id, attributes);
    }

    static async update(object, newObjectData){
        for (const [key, value] of Object.entries(newObjectData)) {
            object[key] = value;
        }
        return await object.save();
    }

    static async delete(object){
        return await object.destroy();
    }
}

module.exports = {DataModel, sequelize};