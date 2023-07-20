/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Product = require("../../common/models/Product");
const ProductCategory = require("../../common/models/ProductCategory");
const {PRODUCT} = require("../../common/config");
const ProductConfiguration = require("../../common/models/ProductConfiguration");
const ProductConfigurationValue = require("../../common/models/ProductConfigurationValue");

class ProductConfigurationController extends Controller {
    defaultModel = ProductConfiguration;

    listPayload = {
        properties: ['id', 'name', ['type', {enum: PRODUCT.CONFIGURATION_TYPE_OPTIONS}], 'active', ['category', {type: 'integer'}]],
        additionalProperties: false,
    };
    createPayload = {
        properties: ['name', ['type', {enum: PRODUCT.CONFIGURATION_TYPE_OPTIONS}], 'active', ['category', {type: 'integer'}], ['values', {type: 'array', minItems: 1, uniqueItems: true, items: {type: "string"}}]],
        additionalProperties: false,
        required: ['name', 'type', 'category', 'values']
    };
    updatePayload = {
        properties: ['name', ['type', {enum: PRODUCT.CONFIGURATION_TYPE_OPTIONS}], 'active', ['category', {type: 'integer'}], ['values', {type: 'array', minItems: 1, uniqueItems: true, items: {type: "string"}}]],
        additionalProperties: false
    };
    listSerializer = {include: [{model: ProductConfigurationValue, as: 'values'}]};
    detailSerializer = {include: [{model: ProductCategory, as: 'category'}, {model: ProductConfigurationValue, as: 'values'}], attributes: {exclude: ['categoryId']}};

    create(req, res) {
        super.create(req, res, async (configuration) => {
            await configuration.setCategory(req.body.category);
            await Promise.all(req.body.values.map(async (value) => {
                await ProductConfigurationValue.create({value: value, configurationId: configuration.id});
            }));
        });
    }

    update(req, res) {
        super.update(req, res, async (configuration) => {
            if(typeof req.body.category !== 'undefined') await configuration.setCategory(req.body.category);
            if(typeof req.body.values !== 'undefined'){
                await Promise.all(req.body.values.map(async (value) => {
                    await ProductConfigurationValue.create({value: value, configurationId: configuration.id});
                }));
            }
        });
    }

}

module.exports = ProductConfigurationController;