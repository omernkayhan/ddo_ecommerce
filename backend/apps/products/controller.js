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
        properties: ['id', 'sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'array'}], ['taxes', {type: 'array'}]],
        additionalProperties: false,
    };
    createPayload = {
        properties: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'array'}], ['taxes', {type: 'array'}]],
        additionalProperties: false,
        required: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', 'category']
    };
    updatePayload = {
        properties: ['sku', 'name', 'shortDescription', 'description', 'sefLink', 'online', 'active', ['category', {type: 'integer'}], ['images', {type: 'array'}], ['taxes', {type: 'array'}]],
        additionalProperties: false
    };

    listSerializer = PRODUCT.INCLUDE_BASIC_LEVEL;
    detailSerializer = PRODUCT.INCLUDE_DETAIL;

    create(req, res) {
        super.create(req, res, async (product) => {
            await product.setCategory(req.body.category);
            if(typeof req.body.taxes !== 'undefined') await product.setTaxes(req.body.taxes);
            if(typeof req.body.images !== 'undefined'){
                await Promise.all(req.body.images.map(async (image) => {
                    if (['png', 'jpg', 'jpeg', 'webp'].includes(image.split('.').slice(-1)[0].toLowerCase())) {
                        await ProductImage.create({
                            path: image,
                            productId: product.id
                        });
                    }
                }));
            }
        });
    }

    update(req, res) {
        super.update(req, res, async (product) => {
            await product.setCategory(req.body.category);
            if(typeof req.body.taxes !== 'undefined') await product.setTaxes(req.body.taxes);
            if(typeof req.body.images !== 'undefined'){
                await Promise.all(req.body.images.map(async (image) => {
                    if (['png', 'jpg', 'jpeg', 'webp'].includes(image.split('.').slice(-1)[0].toLowerCase())) {
                        await ProductImage.create({
                            path: image,
                            productId: product.id
                        });
                    }
                }));
            }
        });
    }

}

module.exports = ProductController;