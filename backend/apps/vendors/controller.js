/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Vendor = require("../../common/models/Vendor");
const User = require("../../common/models/User");
const {USER} = require("../../common/serializer");
const Store = require("../../common/models/Store");
const Role = require("../../common/models/Role");

class VendorController extends Controller {
    defaultModel = Vendor;

    listPayload = {
        properties: [
            'id',
            'vendorCustomData',
            ['store', {type: 'integer'}],
            [
                'user',
                {
                    type: 'object',
                    properties: {
                        username: {type: 'string'},
                        password: {type: 'string'},
                        name: {type: 'string'},
                        surname: {type: 'string'},
                        email: {type: 'string'},
                        phone: {type: 'string'},
                        active: {type: 'boolean'},
                    },
                    additionalProperties: false,
                }
            ]
        ],
        additionalProperties: false,

    };
    createPayload = {
        properties: [
            'vendorCustomData',
            ['store', {type: 'integer'}],
            [
                'user',
                {
                    type: 'object',
                    properties: {
                        username: {type: 'string'},
                        password: {type: 'string'},
                        name: {type: 'string'},
                        surname: {type: 'string'},
                        email: {type: 'string'},
                        phone: {type: 'string'},
                        active: {type: 'boolean'},
                    },
                    additionalProperties: false,
                    required: ['username', 'password', 'name', 'surname', 'email']
                }
            ]
        ],
        additionalProperties: false,
        required: ['vendorCustomData', 'user', 'store']
    };
    updatePayload = {
        properties: [
            'vendorCustomData',
            ['store', {type: 'integer'}],
            [
                'user',
                {
                    type: 'object',
                    properties: {
                        username: {type: 'string'},
                        password: {type: 'string'},
                        name: {type: 'string'},
                        surname: {type: 'string'},
                        email: {type: 'string'},
                        phone: {type: 'string'},
                        active: {type: 'boolean'},
                    },
                    additionalProperties: false,
                }
            ]
        ],
        additionalProperties: false,
    };

    listSerializer = {
        include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user'}, {
            model: Store,
            as: 'store',
            attributes: ['id', 'title', 'storeName']
        }], attributes: {exclude: ['userId', 'storeId']}
    };
    detailSerializer = {
        include: [{...USER.INCLUDE_VENDOR_BASIC, as: 'user'}, {
            model: Store,
            as: 'store',
            attributes: ['id', 'title', 'storeName']
        }], attributes: {exclude: ['userId', 'storeId']}
    };

    create(req, res) {
        super.create(req, res, async (vendor) => {
            const user = await User.create({...req.body.user});
            await user.setRole(await Role.findOne({where: {code: 'customer'}}));
            await vendor.setUser(await user);
            await vendor.setStore(req.body.store);
        });
    }

    update(req, res) {
        super.update(req, res, async (vendor) => {
            const user = await User.findByPk(vendor.userId);
            await user.update(req.body.user);
            if (typeof req.body.store !== 'undefined') await vendor.setStore(req.body.store);
        });
    }

}

module.exports = VendorController;