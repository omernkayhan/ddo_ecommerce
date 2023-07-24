/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Listing = require("../../common/models/Listing");
const Customer = require("../../common/models/Customer");
const CartItem = require("../../common/models/CartItem");
const {PRODUCT} = require("../../common/serializer");
const {success, sequelizeError} = require("../../common/Response");

class CartItemController extends Controller {
    defaultModel = CartItem;
    
    createPayload = {
        properties: [['items', {type: 'object'}]],
        additionalProperties: false,
        required: ['items']
    };
    updatePayload = {
        properties: ['quantity', 'listing'],
        additionalProperties: false
    };

    listSerializer = {include: [{model: Customer, as: 'customer'}, {model: Listing, as: 'listing', ...PRODUCT.INCLUDE_FULL_CONFIGURED_PRODUCT}]};

    list(req, res, next){
        if(req.user.role.code !== 'customer') next();
        req.query.customerId = req.user.customer.id;
        super.list(req, res);
    }

    async create(req, res, next) {
        if (req.user.role.code !== 'customer') next();
        const items = req.body.items;

        for (const [listingId, quantity] of Object.entries(items)) {

            const searchData = {
                listingId: listingId,
                customerId: req.user.customer.id
            };

            const item = await this.defaultModel.findOne({where: searchData});

            if (item) {
                item.quantity += quantity;
                await item.save();
            } else {
                await this.defaultModel.create({
                    ...searchData,
                    quantity
                });
            }

        }

        req.query.customerId = req.user.customer.id;
        this.list(req, res, next);
    }

    get(req, res, next) {
        next();
    }

    update(req, res, next) {
        next();
    }

    async delete(req, res, next) {
       next();
    }

    async deleteItems(req, res, next) {
        if (req.user.role.code !== 'customer') next();
        const items = req.body.items;

        await Promise.all(items.map(async (listingId) => {
            const searchData = {
                listingId: listingId,
                customerId: req.user.customer.id
            };

            const item = await this.defaultModel.findOne({where: searchData});

            if (item) {
                await item.destroy();
            }
        }));

        req.query.customerId = req.user.customer.id;
        this.list(req, res, next);

    }



}

module.exports = CartItemController;