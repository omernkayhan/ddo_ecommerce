/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../../common/Controller");
const Country = require("../../../common/models/Country");

class CountryController extends Controller {
    defaultModel = Country;

    listPayload = {
        properties: ['code', 'name'],
        additionalProperties: false,
    };
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

module.exports = CountryController;