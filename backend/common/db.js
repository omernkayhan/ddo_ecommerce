/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {Sequelize, Model} = require("sequelize");
const {options} = require("pg/lib/defaults");
const {Logger} = require("sequelize/lib/utils/logger");
const sequelize = new Sequelize(`${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {logging: false, force: false, minifyAliases: true});

class DataModel extends Model{

    static modelName = 'Model';
    static attributes = {};
    static options = {};

    static listPayload = {
        properties: [],
        additionalProperties: true
    };
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

    static async upsert(values, condition) {
        const obj = await this.findOne({ where: condition })
        if(obj)
            return await obj.update(values);
        return await this.create(values);

    }
}

module.exports = {DataModel, sequelize};