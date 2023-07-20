/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const AuthController = require("../apps/auth/controller");
const RoleController = require("../apps/admin/roles/controller");
const PermissionController = require("../apps/admin/permissions/controller");
const UserController = require("../apps/admin/users/controller");
const ProductCategoryController = require("../apps/productCategories/controller");
const ShipmentMethodController = require("../apps/shipmentMethods/controller");
const StoreController = require("../apps/stores/controller");
const VendorController = require("../apps/vendors/controller");
const ProductController = require("../apps/products/controller");
const ProductConfigurationController = require("../apps/productConfigurations/controller");
const ConfiguredProductController = require("../apps/configuredProduct/controller");
const ListingController = require("../apps/listings/controller");
const CountryController = require("../apps/constants/countries/controller");
const CurrencyController = require("../apps/constants/currencies/controller");
const TaxController = require("../apps/constants/taxes/controller");
const DiscountController = require("../apps/discounts/controller");
const PaymentMethodController = require("../apps/paymentMethods/controller");

module.exports = {
    AuthController,
    RoleController,
    PermissionController,
    UserController,
    ProductCategoryController,
    ShipmentMethodController,
    StoreController,
    VendorController,
    ProductController,
    ProductConfigurationController,
    ConfiguredProductController,
    ListingController,
    CountryController,
    CurrencyController,
    TaxController,
    DiscountController,
    PaymentMethodController,
};