/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const Role = require("./models/Role");
const Permission = require("./models/Permission");
const ProductCategory = require("./models/ProductCategory");
const Country = require("./models/Country");
const ShipmentMethod = require("./models/ShipmentMethod");
const User = require("./models/User");

const {sequelize} = require("./db");
const Currency = require("./models/Currency");
const Store = require("./models/Store");
const Vendor = require("./models/Vendor");
const Product = require("./models/Product");
const ProductImage = require("./models/ProductImage");
const ProductConfiguration = require("./models/ProductConfiguration");
const ConfiguredProduct = require("./models/ConfiguredProduct");
const ConfigurationItems = require("./models/ConfigurationItems");
const Listing = require("./models/Listing");
const ListingOldPrice = require("./models/ListingOldPrice");
const Tax = require("./models/Tax");
const Discount = require("./models/Discount");
const PaymentMethod = require("./models/PaymentMethod");
const ProductConfigurationValue = require("./models/ProductConfigurationValue");
const UserToken = require("./models/UserToken");
const Customer = require("./models/Customer");
const Comment = require("./models/Comment");
const CartItem = require("./models/CartItem");
const Inventory = require("./models/Inventory");
const OrderItem = require("./models/OrderItem");
const Order = require("./models/Order");
const Payment = require("./models/Payment");

module.exports = {
    syncDB: async (sequelize) => {

        //Currency Model
        await Currency.init();


        //Country Model
        await Country.init();


        //Tax Model
        await Tax.init();
        await sequelize.models.Tax.belongsTo(sequelize.models.Currency, {
            as: 'valueCurrency'
        });


        //Role Model
        await Role.init();


        //Permission Model
        await Permission.init();
        await sequelize.models.Permission.belongsToMany(sequelize.models.Role, {
            through: 'RolePermissions',
            as: 'permissions'
        });
        await sequelize.models.Role.belongsToMany(sequelize.models.Permission, {
            through: 'RolePermissions',
            as: 'permissions'
        });


        //User Model
        await User.init();
        await User.belongsTo(Role, {
            as: 'role'
        });


        //Shipment Model
        await ShipmentMethod.init();
        await sequelize.models.ShipmentMethod.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });

        await sequelize.models.ShipmentMethod.belongsToMany(sequelize.models.Country, {
            through: 'ShipmentMethodCountries',
            as: 'availableCountries'
        });


        //Vendor Model
        await Vendor.init();
        await sequelize.models.Vendor.belongsTo(sequelize.models.User, {
            as: 'user',
            foreignKey: 'userId'
        });


        //Store Model
        await Store.init();
        await sequelize.models.Store.hasMany(sequelize.models.Vendor, {
            as: 'vendors',
            foreignKey: 'storeId'
        });
        await sequelize.models.Vendor.belongsTo(sequelize.models.Store, {
            as: 'store',
            foreignKey: 'storeId'
        });


        //ProductCategory Model
        await ProductCategory.init();
        await sequelize.models.ProductCategory.belongsTo(sequelize.models.ProductCategory, {
            as: 'parent'
        });


        //Product Model
        await Product.init();
        await sequelize.models.Product.belongsTo(sequelize.models.ProductCategory, {
            as: 'category'
        });

        await sequelize.models.Product.belongsToMany(sequelize.models.Tax, {
            through: 'ProductTaxes',
            as: 'taxes'
        });


        //ProductImage Model
        await ProductImage.init();
        await sequelize.models.Product.hasMany(sequelize.models.ProductImage, {
            as: 'images',
            foreignKey: 'productId'
        });
        await sequelize.models.ProductImage.belongsTo(sequelize.models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });


        //ProductConfiguration Model
        await ProductConfiguration.init();
        await sequelize.models.ProductCategory.hasMany(sequelize.models.ProductConfiguration, {
            as: 'configurations',
            foreignKey: 'categoryId'
        });
        await sequelize.models.ProductConfiguration.belongsTo(sequelize.models.ProductCategory, {
            as: 'category',
            foreignKey: 'categoryId'
        });


        //ConfiguredProduct Model
        await ConfiguredProduct.init();
        await sequelize.models.Product.hasMany(sequelize.models.ConfiguredProduct, {
            as: 'product',
            foreignKey: 'productId'
        });
        await sequelize.models.ConfiguredProduct.belongsTo(sequelize.models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });

        await sequelize.models.Vendor.hasMany(sequelize.models.ConfiguredProduct, {
            as: 'configuredProducts',
            foreignKey: 'vendorId'
        });
        await sequelize.models.ConfiguredProduct.belongsTo(sequelize.models.Vendor, {
            as: 'vendor',
            foreignKey: 'vendorId'
        });


        //ConfigurationItems Model
        await ConfigurationItems.init();
        await sequelize.models.ConfiguredProduct.belongsToMany(sequelize.models.ProductConfiguration, {
            through: 'ConfigurationItems',
            as: 'configurations'
        });
        await sequelize.models.ProductConfiguration.belongsToMany(sequelize.models.ConfiguredProduct, {
            through: 'ConfigurationItems',
            as: 'configurations'
        });


        //Listing Model
        await Listing.init();
        await sequelize.models.Listing.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });
        await sequelize.models.Listing.belongsTo(sequelize.models.ConfiguredProduct, {
            as: 'configuredProduct'
        });


        //ListingOldPrice Model
        await ListingOldPrice.init();
        await sequelize.models.ListingOldPrice.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });

        await sequelize.models.Listing.hasMany(sequelize.models.ListingOldPrice, {
            as: 'oldPrices',
            foreignKey: 'listingId'
        });
        await sequelize.models.ListingOldPrice.belongsTo(sequelize.models.Listing, {
            as: 'listing',
            foreignKey: 'listingId'
        });


        //Discount Model
        await Discount.init();
        await sequelize.models.ConfiguredProduct.hasMany(sequelize.models.Discount, {
            as: 'discounts',
            foreignKey: 'configuredProductId'
        });
        await sequelize.models.Discount.belongsTo(sequelize.models.ConfiguredProduct, {
            as: 'configuredProduct',
            foreignKey: 'configuredProductId'
        });


        //PaymentMethod Model
        await PaymentMethod.init();
        await sequelize.models.PaymentMethod.belongsTo(sequelize.models.Currency, {
            as: 'feeCurrency'
        });
        await sequelize.models.PaymentMethod.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });

        await sequelize.models.PaymentMethod.belongsToMany(sequelize.models.Country, {
            through: 'PaymentMethodCountries',
            as: 'availableCountries'
        });


        //ProductConfigurationValue Model
        await ProductConfigurationValue.init();
        await sequelize.models.ProductConfiguration.hasMany(sequelize.models.ProductConfigurationValue, {
            as: 'values',
            foreignKey: 'configurationId'
        });
        await sequelize.models.ProductConfigurationValue.belongsTo(sequelize.models.ProductConfiguration, {
            as: 'configuration',
            foreignKey: 'configurationId'
        });


        //UserToken Model
        await UserToken.init();
        await sequelize.models.UserToken.belongsTo(sequelize.models.User, {
            as: 'user',
            foreignKey: 'userId'
        });


        //Customer Model
        await Customer.init();
        await sequelize.models.Customer.belongsTo(sequelize.models.User, {
            as: 'user',
            foreignKey: 'userId'
        });


        //Customer Model
        await Comment.init();
        await sequelize.models.Comment.belongsTo(sequelize.models.Customer, {
            as: 'customer',
            foreignKey: 'customerId'
        });
        await sequelize.models.Comment.belongsTo(sequelize.models.Listing, {
            as: 'listing',
            foreignKey: 'listingId'
        });


        //Inventory Model
        await Inventory.init();
        await sequelize.models.Inventory.belongsTo(sequelize.models.Listing, {
            as: 'listing'
        });
        await sequelize.models.Inventory.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });


        //CartItem Model
        await CartItem.init();
        await sequelize.models.CartItem.belongsTo(sequelize.models.Listing, {
            as: 'listing'
        });
        await sequelize.models.CartItem.belongsTo(sequelize.models.Customer, {
            as: 'customer'
        });


        //OrderItem Model
        await OrderItem.init();
        await sequelize.models.OrderItem.belongsTo(sequelize.models.ShipmentMethod, {
            as: 'shipmentMethod'
        });
        await sequelize.models.OrderItem.belongsTo(sequelize.models.Listing, {
            as: 'listing'
        });
        await sequelize.models.OrderItem.belongsToMany(sequelize.models.Tax, {
            through: 'OrderItemTaxes',
            as: 'taxes'
        });
        await sequelize.models.Tax.belongsToMany(sequelize.models.OrderItem, {
            through: 'OrderItemTaxes',
            as: 'taxes'
        });
        await sequelize.models.OrderItem.belongsTo(sequelize.models.Currency, {
            as: 'priceCurrency'
        });


        //Order Model
        await Order.init();
        await sequelize.models.Order.hasMany(sequelize.models.OrderItem, {
            as: 'items',
            foreignKey: 'orderId'
        });
        await sequelize.models.OrderItem.belongsTo(sequelize.models.Order, {
            as: 'order',
            foreignKey: 'orderId'
        });
        await sequelize.models.Order.belongsTo(sequelize.models.Currency, {
            as: 'totalCurrency'
        });
        await sequelize.models.Order.belongsTo(sequelize.models.Customer, {
            as: 'customer'
        });


        //Payment Model
        await Payment.init();
        await sequelize.models.Payment.belongsTo(sequelize.models.PaymentMethod, {
            as: 'paymentMethod'
        });
        await sequelize.models.Payment.belongsTo(sequelize.models.Currency, {
            as: 'paidCurrency'
        });
        await sequelize.models.Payment.belongsTo(sequelize.models.Order, {
            as: 'order',
            foreignKey: 'orderId'
        });
        await sequelize.models.Order.hasOne(sequelize.models.Payment, {
            as: 'payment',
            foreignKey: 'orderId'
        });

        if (process.env.DEV === 'false') {
            return true;
        }
        return await sequelize.sync();
    }
};