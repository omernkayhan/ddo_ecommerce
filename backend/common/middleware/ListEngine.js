/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 20/07/2023
*/


const {error} = require("../Response");
const {DEFAULT_PAGE_ITEM_COUNT} = require("../config");
module.exports = {
    generate: (req, res, next) => {
        req.page = parseInt(req.query.__page ?? "1");
        if(typeof req.query.__page !== 'undefined') delete req.query.__page;
        if(req.page < 1){
            return error(res, `Invalid Request: '__page' parameter cannot be less than 1!`);
        }

        req.limit = parseInt(req.query.__limit ?? DEFAULT_PAGE_ITEM_COUNT.toString());
        if(typeof req.query.__limit !== 'undefined') delete req.query.__limit;
        if(req.limit < 0){
            return error(res, `Invalid Request: '__limit' parameter cannot be less than 0!`);
        }

        const order = JSON.parse(req.query.__order ?? '[]');
        if(typeof req.query.__order !== 'undefined') delete req.query.__order;
        req.order = [];
        for (const [column, orderType] of Object.entries(order)) {
            req.order.push([column, orderType]);
        }

        next();
    }
};