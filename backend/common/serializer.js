/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const Role = require("./models/Role");
const User = require("./models/User");
const Permission = require("./models/Permission");
const ProductCategory = require("./models/ProductCategory");
const ProductImage = require("./models/ProductImage");
const Product = require("./models/Product");
const ProductConfiguration = require("./models/ProductConfiguration");
const Tax = require("./models/Tax");
const Currency = require("./models/Currency");
const Vendor = require("./models/Vendor");
const Store = require("./models/Store");
const Discount = require("./models/Discount");
const ConfiguredProduct = require("./models/ConfiguredProduct");

const PERMISSION_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'code', 'name']
};

const PERMISSION = {
    INCLUDE_BASIC_LEVEL: {model: Permission, attributes: PERMISSION_ATTRIBUTES.BASIC_LEVEL}
};

const ROLE_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'code', 'name']
};

const ROLE = {
    INCLUDE_BASIC_LEVEL: {model: Role, attributes: ROLE_ATTRIBUTES.BASIC_LEVEL},
    INCLUDE_WITH_PERMISSION: {
        model: Role,
        attributes: ROLE_ATTRIBUTES.BASIC_LEVEL,
        include: {...PERMISSION.INCLUDE_BASIC_LEVEL, as: 'permissions', through: {attributes: []}}
    }
};

const USER_ATTRIBUTES = {
    BASIC_LEVEL: ['id', 'name', 'surname'],
    HIDE_PASSWORD: {exclude: ['password']},
};

const USER = {
    INCLUDE_BASIC_LEVEL: {
        model: User,
        attributes: USER_ATTRIBUTES.BASIC_LEVEL
    },
    INCLUDE_WITHOUT_ROLE: {
        model: User,
        attributes: USER_ATTRIBUTES.HIDE_PASSWORD,
    },
    INCLUDE_WITH_ROLE: {
        model: User,
        attributes: {exclude: ['password', 'roleId']},
        include: {...ROLE.INCLUDE_BASIC_LEVEL, as: 'role'}
    },
    INCLUDE_WITH_ROLE_AND_PERMISSIONS: {
        model: User,
        attributes: USER_ATTRIBUTES.HIDE_PASSWORD,
        include: ROLE.INCLUDE_WITH_PERMISSION
    },
    INCLUDE_VENDOR_BASIC: {
        model: User,
        attributes: [...USER_ATTRIBUTES.BASIC_LEVEL, 'email', 'phone', 'active', 'createdAt', 'updatedAt'],
    },
};

const PRODUCT_ATTRIBUTES = {
    BASIC_LEVEL: {exclude: ['description', 'shortDescription', 'categoryId']}
};

const PRODUCT = {
    INCLUDE_BASIC_LEVEL: {
        attributes: PRODUCT_ATTRIBUTES.BASIC_LEVEL,
        include: [{model: ProductCategory, as: 'category'}, {
            model: ProductImage,
            as: 'images',
            attributes: ['id', 'path']
        }, {
            model: Tax,
            as: 'taxes',
            attributes: {exclude: ['valueCurrencyCode']},
            include: {model: Currency, as: 'valueCurrency'},
            through: {attributes: []}
        }]
    },
    INCLUDE_DETAIL: {
        attributes: {exclude: ['categoryId']},
        include: [{model: ProductCategory, as: 'category'}, {
            model: ProductImage,
            as: 'images',
            attributes: ['id', 'path']
        }, {
            model: Tax,
            as: 'taxes',
            attributes: {exclude: ['valueCurrencyCode']},
            include: {model: Currency, as: 'valueCurrency'},
            through: {attributes: []}
        }]
    },
    INCLUDE_FULL: {
        attributes: {exclude: ['productId', 'vendorId']},
        include: [{
            model: Vendor,
            as: 'vendor',
            attributes: [],
            include: {
                model: Store,
                as: 'store',
                attributes: ['id', 'storeName', 'logo', 'createdAt']
            }
        }, {
            model: Product,
            as: 'product',
            attributes: {exclude: ['categoryId', 'createdAt', 'updatedAt']},
            include: [{model: ProductCategory, as: 'category'}, {
                model: ProductImage,
                as: 'images',
                attributes: ['path']
            }, {
                model: Tax,
                as: 'taxes',
                attributes: {exclude: ['valueCurrencyCode']},
                include: {model: Currency, as: 'valueCurrency'},
                through: {attributes: []}
            }]
        }, {
            model: ProductConfiguration,
            as: 'configurations',
            attributes: ['id', 'name', 'type'],
            through: {as: 'configurationValue', attributes: ['value']}
        }, {
            model: Discount,
            as: 'discounts',
            attributes: ['name', 'type', 'value', 'active']
        }]
    },
    INCLUDE_FULL_CONFIGURED_PRODUCT: {
        attributes: {exclude: ['configuredProductId', 'priceCurrencyCode']},
        include: [
            {model: Currency, as: 'priceCurrency'},
            {
                model: ConfiguredProduct, as: 'configuredProduct', attributes: {exclude: ['productId', 'vendorId']},
                include: [{
                    model: Vendor,
                    as: 'vendor',
                    attributes: [],
                    include: {
                        model: Store,
                        as: 'store',
                        attributes: ['id', 'storeName', 'logo', 'createdAt']
                    }
                }, {
                    model: Product,
                    as: 'product',
                    attributes: {exclude: ['categoryId']},
                    include: [{model: ProductCategory, as: 'category'}, {
                        model: ProductImage,
                        as: 'images',
                        attributes: ['path']
                    }, {
                        model: Tax,
                        as: 'taxes',
                        attributes: {exclude: ['valueCurrencyCode']},
                        include: {model: Currency, as: 'valueCurrency'},
                        through: {attributes: []}
                    }]
                }, {
                    model: ProductConfiguration,
                    as: 'configurations',
                    attributes: ['id', 'name', 'type'],
                    through: {as: 'configurationValue', attributes: ['value']}
                }, {
                    model: Discount,
                    as: 'discounts',
                    attributes: ['name', 'type', 'value', 'active']
                }]
            }
        ]
    }
};

module.exports = {
    PERMISSION_ATTRIBUTES, PERMISSION,
    ROLE_ATTRIBUTES, ROLE,
    USER_ATTRIBUTES, USER,
    PRODUCT_ATTRIBUTES, PRODUCT,
};