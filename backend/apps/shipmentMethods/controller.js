/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const ShipmentMethod = require("../../common/models/ShipmentMethod");
const Country = require("../../common/models/Country");
const Currency = require("../../common/models/Currency");
const {error} = require("../../common/Response");

class ShipmentMethodController extends Controller {
    defaultModel = ShipmentMethod;
    

    createPayload = {
        properties: ['name', 'logo', 'description', 'minWeight', 'maxWeight', 'price', 'active', ['availableCountries', {type: 'array', uniqueItems: true, items: {type: "string"}}], ['priceCurrency', {type: 'string'}]],
        additionalProperties: false,
        required: ['name', 'price']
    };

    updatePayload = {
        properties: ['name', 'logo', 'description', 'minWeight', 'maxWeight', 'price', 'active', ['availableCountries', {type: 'array', uniqueItems: true, items: {type: "string"}}], ['priceCurrency', {type: 'string'}]],
        additionalProperties: false
    };

    listSerializer = {attributes: {exclude: ['description', 'price', 'priceCurrencyCode', 'minWeight', 'maxWeight']}};
    detailSerializer = {attributes: {exclude: ['priceCurrencyCode']}, include: [{model: Country, through: {attributes: []}, as: 'availableCountries'}, {model: Currency, as: 'priceCurrency'}]};

    create(req, res) {
        super.create(req, res, async (role) => {
            if(typeof req.body.availableCountries !== 'undefined') await role.setAvailableCountries(req.body.availableCountries);
            if(typeof req.body.priceCurrency !== 'undefined') await role.setPriceCurrency(req.body.priceCurrency);
        });
    }

    update(req, res) {
        super.update(req, res, async (role) => {
            if(typeof req.body.availableCountries !== 'undefined') await role.setAvailableCountries(req.body.availableCountries);
            if(typeof req.body.priceCurrency !== 'undefined') await role.setPriceCurrency(req.body.priceCurrency);
        });
    }

}

module.exports = ShipmentMethodController;