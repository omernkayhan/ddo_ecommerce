/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Comment = require("../../common/models/Comment");
const Listing = require("../../common/models/Listing");
const Customer = require("../../common/models/Customer");

class CommentController extends Controller {
    defaultModel = Comment;

    listPayload = {
        properties: ['id', 'star', 'comment'],
        additionalProperties: false,
    };
    createPayload = {
        properties: ['star', 'comment', ['customer', {type: 'integer'}], ['listing', {type: 'integer'}]],
        additionalProperties: false,
        required: ['star', 'comment', 'customer', 'listing']
    };
    updatePayload = {
        properties: ['star', 'comment', ['customer', {type: 'integer'}], ['listing', {type: 'integer'}]],
        additionalProperties: false
    };

    listSerializer = {include: [{model: Customer, as: 'customer'}, {model: Listing, as: 'listing'}]};

    create(req, res) {
        super.create(req, res, async (comment) => {
            await comment.setCustomer(req.body.customer);
            await comment.setListing(req.body.listing);
        });
    }

    update(req, res) {
        super.update(req, res, async (Customer) => {
            if(typeof req.body.customer !== 'undefined') await comment.setCustomer(req.body.customer);
            if(typeof req.body.listing !== 'undefined') await comment.setListing(req.body.listing);
        });
    }

    findByListingId(req, res) {
        req.query.listingId = req.params.listingId;
        return super.list(req, res);
    }

}

module.exports = CommentController;