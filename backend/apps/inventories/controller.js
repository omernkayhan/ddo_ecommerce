/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Listing = require("../../common/models/Listing");
const Customer = require("../../common/models/Customer");
const Order = require("../../common/models/Order");

class InventoryController extends Controller {
    defaultModel = Order;
    
    createPayload = {
        properties: ['number', 'status', 'total', ['totalCurrency', {type: 'integer'}], ['customer', {type: 'integer'}], ['items', {type: 'object'}]],
        additionalProperties: false,
        required: ['number', 'status', 'total', 'totalCurrency', 'customer', 'items']
    };
    updatePayload = {
        properties: ['star', 'comment', ['customer', {type: 'integer'}], ['listing', {type: 'integer'}]],
        additionalProperties: false
    };

    listSerializer = {};

    list(req, res, next) {
        if(req.user.role.code === 'customer'){
            req.query.customerId = req.user.customer.id;
        }else if(req.user.role.code === 'sysadmin'){}else{
            return next();
        }
        super.list(req, res);
    }

}

module.exports = InventoryController;