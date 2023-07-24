/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Discount = require("../../common/models/Discount");
const ConfiguredProduct = require("../../common/models/ConfiguredProduct");
const serializer = require("../../common/serializer");

class DiscountController extends Controller {
    defaultModel = Discount;
    
    createPayload = {
        properties: ['name', ['type', {enum: ['fixed', 'proportional']}], 'value', 'active', ['valueCurrency', {type: 'string'}], ['configuredProduct', {type: 'integer'}]],
        additionalProperties: false,
        required: ['name', 'type', 'value', 'configuredProduct']
    };
    updatePayload = {
        properties: ['name', ['type', {enum: ['fixed', 'proportional']}], 'value', 'active', ['valueCurrency', {type: 'string'}], ['configuredProduct', {type: 'integer'}]],
        additionalProperties: false
    };

    detailSerializer = {attributes: {exclude: ['configuredProductId']}, include: {model: ConfiguredProduct, as: 'configuredProduct', ...serializer.PRODUCT.INCLUDE_FULL}};

    create(req, res) {
        req.body.configuredProductId = req.body.configuredProduct;
        super.create(req, res);
    }
}

module.exports = DiscountController;