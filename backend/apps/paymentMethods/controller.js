/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Country = require("../../common/models/Country");
const Currency = require("../../common/models/Currency");
const PaymentMethod = require("../../common/models/PaymentMethod");

class PaymentMethodController extends Controller {
    defaultModel = PaymentMethod;

    listPayload = {
        properties: ['id', 'name', 'logo', 'description', 'minPrice', 'maxPrice', 'fee', 'active'],
        additionalProperties: false
    };

    createPayload = {
        properties: ['name', 'logo', 'description', 'minPrice', 'maxPrice', 'fee', 'active', ['availableCountries', {type: 'array', uniqueItems: true, items: {type: "string"}}], ['feeCurrency', {type: 'string'}], ['priceCurrency', {type: 'string'}]],
        additionalProperties: false,
        required: ['name', 'fee']
    };

    updatePayload = {
        properties: ['name', 'logo', 'description', 'minPrice', 'maxPrice', 'fee', 'active', ['availableCountries', {type: 'array', uniqueItems: true, items: {type: "string"}}], ['feeCurrency', {type: 'string'}], ['priceCurrency', {type: 'string'}]],
        additionalProperties: false
    };

    listSerializer = {attributes: {exclude: ['description', 'fee', 'feeCurrencyCode', 'minPrice', 'maxPrice', 'priceCurrencyCode']}};
    detailSerializer = {attributes: {exclude: ['feeCurrencyCode', 'priceCurrencyCode']}, include: [{model: Country, through: {attributes: []}, as: 'availableCountries'}, {model: Currency, as: 'feeCurrency'}, {model: Currency, as: 'priceCurrency'}]};

    create(req, res) {
        super.create(req, res, async (role) => {
            if(typeof req.body.availableCountries !== 'undefined') await role.setAvailableCountries(req.body.availableCountries);
            if(typeof req.body.feeCurrency !== 'undefined') await role.setFeeCurrency(req.body.feeCurrency);
            if(typeof req.body.priceCurrency !== 'undefined') await role.setPriceCurrency(req.body.priceCurrency);
        });
    }

    update(req, res) {
        super.update(req, res, async (role) => {
            if(typeof req.body.availableCountries !== 'undefined') await role.setAvailableCountries(req.body.availableCountries);
            if(typeof req.body.feeCurrency !== 'undefined') await role.setFeeCurrency(req.body.feeCurrency);
            if(typeof req.body.priceCurrency !== 'undefined') await role.setPriceCurrency(req.body.priceCurrency);
        });
    }

}

module.exports = PaymentMethodController;