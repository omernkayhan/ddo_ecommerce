/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Comment = require("../../common/models/Comment");
const Listing = require("../../common/models/Listing");
const Customer = require("../../common/models/Customer");
const User = require("../../common/models/User");
const {USER} = require("../../common/serializer");
const Role = require("../../common/models/Role");
const Currency = require("../../common/models/Currency");
const ConfiguredProduct = require("../../common/models/ConfiguredProduct");
const serializer = require("../../common/serializer");
const ListingOldPrice = require("../../common/models/ListingOldPrice");

class CommentController extends Controller {
    defaultModel = Comment;

    createPayload = {
        properties: ['star', 'comment', ['listing', {type: 'integer'}]],
        additionalProperties: false,
        required: ['star', 'comment', 'listing']
    };
    updatePayload = {
        properties: ['star', 'comment', ['listing', {type: 'integer'}]],
        additionalProperties: false
    };

    listSerializer = {
        attributes: {exclude: ['customerId', 'listingId']},
        include: [{
            model: Customer,
            as: 'customer',
            include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user'}],
            attributes: {exclude: ['userId', 'storeId']}
        }, {model: Listing, as: 'listing'}]
    };
    detailSerializer = {
        attributes: {exclude: ['customerId', 'listingId']},
        include: [{
            model: Customer,
            as: 'customer',
            include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user'}],
            attributes: {exclude: ['userId', 'storeId']}
        }, {
            model: Listing, as: 'listing', include: [{model: Currency, as: 'priceCurrency'}, {
                model: ConfiguredProduct,
                as: 'configuredProduct', ...serializer.PRODUCT.INCLUDE_FULL
            }, {
                model: ListingOldPrice,
                as: 'oldPrices',
                attributes: {exclude: ['updatedAt', 'listingId', 'priceCurrencyCode']},
                include: {model: Currency, as: 'priceCurrency'}
            }]
        }]
    };

    create(req, res, next) {
        if (req.user.role.code !== 'customer') next();
        req.body.customer = req.user.customer.id;

        super.create(req, res, async (comment) => {
            await comment.setCustomer(req.body.customer);
            await comment.setListing(req.body.listing);
        });
    }

    update(req, res, next) {
        if (req.user.role.code !== 'customer') next();
        req.body.customer = req.user.customer.id;

        super.update(req, res, async (Customer) => {
            if (typeof req.body.customer !== 'undefined') await comment.setCustomer(req.body.customer);
            if (typeof req.body.listing !== 'undefined') await comment.setListing(req.body.listing);
        });
    }

    list(req, res, next) {
        if (req.user.role.code === 'customer') req.body.customer = req.user.customer.id;
        super.list(req, res);
    }

    findByListingId(req, res) {
        req.query.listingId = req.params.listingId;
        return super.list(req, res);
    }

}

module.exports = CommentController;