/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Product = require("../../common/models/Product");
const ProductCategory = require("../../common/models/ProductCategory");
const {PRODUCT, DEFAULT_ACTIVE_LISTING} = require("../../common/config");
const serializer = require("../../common/serializer");
const ConfiguredProduct = require("../../common/models/ConfiguredProduct");
const ProductConfiguration = require("../../common/models/ProductConfiguration");
const Currency = require("../../common/models/Currency");
const ProductImage = require("../../common/models/ProductImage");
const ListingOldPrice = require("../../common/models/ListingOldPrice");
const Listing = require("../../common/models/Listing");
const {buildCondition} = require("../../common/middleware/ConditionBuilder");
const {success, sequelizeError} = require("../../common/Response");
const {buildPageResult} = require("../../common/middleware/PageResultBuilder");
const Vendor = require("../../common/models/Vendor");
const Store = require("../../common/models/Store");
const Tax = require("../../common/models/Tax");
const Discount = require("../../common/models/Discount");
const {Op} = require("sequelize");

class ListingController extends Controller {
    defaultModel = Listing;
    
    createPayload = {
        properties: ['price', ['configuredProduct', {type: 'number'}], ['priceCurrency', {type: 'string'}], 'listingStartDateTime'],
        additionalProperties: false,
        required: ['price', 'priceCurrency', 'configuredProduct', 'listingStartDateTime']
    };
    updatePayload = {
        properties: ['price', ['priceCurrency', {type: 'string'}]],
        additionalProperties: false
    };

    listSerializer = {
        attributes: {exclude: ['priceCurrencyCode', 'configuredProductId']},
        include: [{model: Currency, as: 'priceCurrency'}, {
            model: ConfiguredProduct,
            as: 'configuredProduct', ...serializer.PRODUCT.INCLUDE_FULL
        }]
    };
    detailSerializer = {
        include: [{model: Currency, as: 'priceCurrency'}, {
            model: ConfiguredProduct,
            as: 'configuredProduct', ...serializer.PRODUCT.INCLUDE_FULL
        }, {
            model: ListingOldPrice,
            as: 'oldPrices',
            attributes: {exclude: ['updatedAt', 'listingId', 'priceCurrencyCode']},
            include: {model: Currency, as: 'priceCurrency'}
        }]
    };

    create(req, res) {
        super.create(req, res, async (listing) => {
            await listing.setPriceCurrency(req.body.priceCurrency);
            await listing.setConfiguredProduct(req.body.configuredProduct);

            const oldPrice = await ListingOldPrice.create({price: req.body.price, listingId: listing.id});
            await oldPrice.setPriceCurrency(req.body.priceCurrency);
        });
    }

    update(req, res) {
        super.update(req, res, async (listing) => {
            if (typeof req.body.price !== 'undefined') {
                const oldPrice = await ListingOldPrice.create({price: req.body.price, listingId: listing.id});
                await oldPrice.setPriceCurrency(req.body.priceCurrency);
            }

            if (typeof req.body.priceCurrency !== 'undefined') await listing.setPriceCurrency(req.body.priceCurrency);
        });
    }

    findByProductId(req, res) {
        let orConditions = [];
        for (const [configurationName, configurationValue] of Object.entries(req.query)) {
            orConditions.push({
                '$configuredProduct.configurations.name$': configurationName,
                '$configuredProduct.configurations.configurationValue.value$': configurationValue
            });
        }
        let search = {
            where: {
                ...((orConditions.length > 0) ? {[Op.or]: orConditions} : {})
            },
            attributes: ['id'],
            include: [{
                model: ConfiguredProduct, as: 'configuredProduct',
                attributes: ['id'],
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id'],
                    where: {
                        id: parseInt(req.params.productId)
                    }
                }, {
                    model: ProductConfiguration,
                    as: 'configurations',
                    attributes: ['name'],
                    through: {as: 'configurationValue', attributes: ['value']}
                }]
            }]
        };

        this.defaultModel.findAll(search).then((items) => {
            items = items.filter((item) => {
                return item.configuredProduct.configurations.length === orConditions.length || Object.values(req.query).length === 0;
            });

            if (items.length === 0) {
                return success(res, null);
            } else {
                req.query = {
                    id: items.map((item) => {
                        return item.id;
                    })
                };
                this.list(req, res);
            }
        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

}

module.exports = ListingController;