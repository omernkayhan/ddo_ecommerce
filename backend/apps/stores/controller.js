/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Store = require("../../common/models/Store");
const Vendor = require("../../common/models/Vendor");
const User = require("../../common/models/User");
const {USER} = require("../../common/serializer");

class StoreController extends Controller {
    defaultModel = Store;

    listPayload = {
        properties: ['id', 'title', 'storeName', 'address', 'addressCity', 'logo', 'taxId', 'taxOffice', 'active'],
        additionalProperties: false
    };

    createPayload = {
        properties: ['title', 'storeName', 'address', 'addressCity', 'logo', 'taxId', 'taxOffice', 'active'],
        additionalProperties: false,
        required: ['title', 'storeName', 'address_city', 'logo', 'tax_id', 'tax_office', 'active']
    };

    updatePayload = {
        properties: ['title', 'storeName', 'address', 'addressCity', 'logo', 'taxId', 'taxOffice', 'active'],
        additionalProperties: false
    };

    listSerializer = {attributes: {exclude: ['address', 'logo', 'taxId', 'taxOffice']}};
    detailSerializer = {include: [{model: Vendor, as: 'vendors', attributes: {exclude: ['id', 'userId', 'storeId']}, include: {...USER.INCLUDE_BASIC_LEVEL, as: 'user'}}]};

}

module.exports = StoreController;