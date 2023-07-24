/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../../common/Controller");
const Currency = require("../../../common/models/Currency");

class CurrencyController extends Controller {
    defaultModel = Currency;
    
    createPayload = {
        properties: ['code', 'name'],
        additionalProperties: false,
        required: ['code', 'name']
    };
    updatePayload = {
        properties: ['code', 'name'],
        additionalProperties: false
    };
}

module.exports = CurrencyController;