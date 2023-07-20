/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const ProductCategory = require("../../common/models/ProductCategory");

class ProductCategoryController extends Controller {
    defaultModel = ProductCategory;

    listPayload = {properties: ['id', 'name', ['parent', {type: 'number'}], 'active', 'sefLink'], additionalProperties: false};
    createPayload = {
        properties: ['name', ['parent', {type: 'number'}], 'active', 'sefLink'],
        additionalProperties: false,
        required: ['name']
    };
    updatePayload = {properties: ['name', ['parent', {type: 'number'}], 'active', 'sefLink'], additionalProperties: false};

    create(req, res) {
        if (typeof req.body.sef_link === 'undefined') req.body.sef_link = Controller.sef_link(req.body.name);
        super.create(req, res, async (category) => {
            if (typeof req.body.parent !== 'undefined') await category.setParent(req.body.parent);
        });
    }

    update(req, res) {
        super.update(req, res, async (category) => {
            if (typeof req.body.parent !== 'undefined') await category.setParent(req.body.parent);
        });
    }

    detailSerializer = {attributes: {exclude: ['parentId']}, include: {model: ProductCategory, as: 'parent'}}

}

module.exports = ProductCategoryController;