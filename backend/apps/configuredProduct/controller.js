/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Product = require("../../common/models/Product");
const ProductCategory = require("../../common/models/ProductCategory");
const {PRODUCT} = require("../../common/config");
const serializer = require("../../common/serializer");
const ConfiguredProduct = require("../../common/models/ConfiguredProduct");
const ProductConfiguration = require("../../common/models/ProductConfiguration");
const Currency = require("../../common/models/Currency");
const ProductImage = require("../../common/models/ProductImage");
const {success, sequelizeError} = require("../../common/Response");

class ConfiguredProductController extends Controller {
    defaultModel = ConfiguredProduct;
    
    createPayload = {
        properties: ['active', 'weight', ['vendor', {type: 'number'}], ['product', {type: 'number'}], ['configurations', {type: 'object'}]],
        additionalProperties: false,
        required: ['vendor', 'product']
    };
    updatePayload = {
        properties: ['active', 'weight', ['vendor', {type: 'number'}], ['product', {type: 'number'}], ['configurations', {type: 'object'}]],
        additionalProperties: false
    };
    listSerializer = serializer.PRODUCT.INCLUDE_FULL;

    detailSerializer = serializer.PRODUCT.INCLUDE_FULL;

    create(req, res) {
        super.create(req, res, async (configuredProduct) => {
            await configuredProduct.setVendor(req.body.vendor);
            await configuredProduct.setProduct(req.body.product);
            if(typeof req.body.configurations !== 'undefined'){
                for (const [configuration, value] of Object.entries(req.body.configurations)) {
                    await configuredProduct.addConfigurations(configuration, { through: { value: value } });
                }
            }
        });
    }

    update(req, res) {
        super.update(req, res, async (configuredProduct) => {
            if(typeof req.body.vendor !== 'undefined') await configuredProduct.setVendor(req.body.vendor);
            if(typeof req.body.product !== 'undefined') await configuredProduct.setProduct(req.body.product);
            if(typeof req.body.configurations !== 'undefined'){
                for (const [configuration, value] of Object.entries(req.body.configurations)) {
                    await configuredProduct.addConfigurations(configuration, { through: { value: value } });
                }
            }
        });
    }

    getConfigurationValues(req, res) {
        let search = {
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
        };

        this.defaultModel.findAll(search).then((items) => {
            let configurationValues = {};
            items.forEach((item) => {
                item.configurations.forEach((configuration) => {
                    if(typeof configurationValues[configuration.name] === 'undefined') configurationValues[configuration.name] = [];
                    if(!configurationValues[configuration.name].includes(configuration.configurationValue.value)) configurationValues[configuration.name].push(configuration.configurationValue.value);
                })
            });

            return success(res, configurationValues);
        }).catch((error) => {
            return sequelizeError(res, error);
        });
    }

}

module.exports = ConfiguredProductController;