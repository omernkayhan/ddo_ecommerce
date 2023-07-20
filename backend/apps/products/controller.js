/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Product = require("../../common/models/Product");
const ProductCategory = require("../../common/models/ProductCategory");
const ProductImage = require("../../common/models/ProductImage");
const {PRODUCT} = require("../../common/serializer");

class ProductController extends Controller {
    defaultModel = Product;

    listPayload = {
        properties: ['id', 'sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'integer'}]],
        additionalProperties: false,
    };
    createPayload = {
        properties: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'integer'}]],
        additionalProperties: false,
        required: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', 'category']
    };
    updatePayload = {
        properties: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'integer'}]],
        additionalProperties: false
    };

    listSerializer = PRODUCT.INCLUDE_BASIC_LEVEL;
    detailSerializer = PRODUCT.INCLUDE_DETAIL;

    create(req, res) {
        super.create(req, res, async (product) => {
            await product.setCategory(req.body.category);
        });
    }

    update(req, res) {
        super.update(req, res, async (product) => {
            await product.setCategory(req.body.category);
        });
    }

}

module.exports = ProductController;