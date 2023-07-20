/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../../common/Controller");
const Tax = require("../../../common/models/Tax");
const Currency = require("../../../common/models/Currency");

class TaxController extends Controller {
    defaultModel = Tax;

    listPayload = {
        properties: ['id', 'name', ['type', {enum: ['fixed', 'proportional']}], ['valueCurrency', {type: 'string'}], 'value', 'active'],
        additionalProperties: false,
    };
    createPayload = {
        properties: ['name', ['type', {enum: ['fixed', 'proportional']}], ['valueCurrency', {type: 'string'}], 'value', 'active'],
        additionalProperties: false,
        required: ['name', 'type', 'value', 'valueCurrency']
    };
    updatePayload = {
        properties: ['name', ['type', {enum: ['fixed', 'proportional']}], ['valueCurrency', {type: 'string'}], 'value', 'active'],
        additionalProperties: false
    };

    detailSerializer = {attributes: {exclude: ['valueCurrencyCode']}, include: {model: Currency, as: 'valueCurrency'}};

    create(req, res) {
        super.create(req, res, async (tax) => {
            await tax.setValueCurrency(req.body.valueCurrency);
        });
    }

    update(req, res) {
        super.update(req, res, async (tax) => {
            if(typeof req.body.valueCurrency !== 'undefined') await tax.setValueCurrency(req.body.valueCurrency);
        });
    }
}

module.exports = TaxController;