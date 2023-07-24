/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/


const Controller = require("../../common/Controller");
const Customer = require("../../common/models/Customer");
const User = require("../../common/models/User");
const {USER} = require("../../common/serializer");
const Role = require("../../common/models/Role");

class CustomerController extends Controller {
    defaultModel = Customer;
    
    createPayload = {
        properties: [
            'address',
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
        required: ['address', 'user']
    };
    updatePayload = {
        properties: [
            'address',
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
        include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user', include: [{model: Role, as: 'role'}]}], attributes: {exclude: ['userId', 'storeId']}
    };
    detailSerializer = {
        include: [{...USER.INCLUDE_VENDOR_BASIC, as: 'user'}], attributes: {exclude: ['userId', 'storeId']}
    };

    create(req, res) {
        super.create(req, res, async (Customer) => {
            const user = await User.create({...req.body.user});
            await user.setRole(await Role.findOne({where: {code: 'customer'}}));
            await Customer.setUser(await user);
        });
    }

    update(req, res) {
        super.update(req, res, async (Customer) => {
            const user = await User.findByPk(Customer.userId);
            await user.update(req.body.user);
        });
    }

}

module.exports = CustomerController;