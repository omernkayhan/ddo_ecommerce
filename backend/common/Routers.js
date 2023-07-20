/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const test = require("../test");
const {success} = require("./Response");
const {authenticateCheck} = require("./middleware/IsAuthenticatedMiddleware");

const AuthRouter = require("../apps/auth/router");
const RoleRouter = require("../apps/admin/roles/router");
const PermissionRouter = require("../apps/admin/permissions/router");
const UserRouter = require("../apps/admin/users/router");
const ProductCategoryRouter = require("../apps/productCategories/router");
const ShipmentMethodRouter = require("../apps/shipmentMethods/router");
const Controllers = require("./Controllers");
const StoreRouter = require("../apps/stores/router");
const VendorRouter = require("../apps/vendors/router");
const ProductRouter = require("../apps/products/router");
const ProductConfigurationRouter = require("../apps/productConfigurations/router");
const ConfiguredProductRouter = require("../apps/configuredProduct/router");
const ListingRouter = require("../apps/listings/router");
const CountryRouter = require("../apps/constants/countries/router");
const CurrencyRouter = require("../apps/constants/currencies/router");
const TaxRouter = require("../apps/constants/taxes/router");
const DiscountRouter = require("../apps/discounts/router");
const PaymentMethodRouter = require("../apps/paymentMethods/router");
const CustomerRouter = require("../apps/customers/router");
const CommentRouter = require("../apps/comments/router");

module.exports = {
    routers: {},
    initRouters: (app) => {
        return this.routers = {
            testRouter: app.get('/test', (req, res) => {
                test();
                return success(res, null);
            }),
            whoamiRouter: app.get('/whoami', [authenticateCheck(['', 'whoami'])], (req, res) => {
                return success(res, req.user);
            }),
            authRouter: new AuthRouter('/auth', Controllers.AuthController, app),
            roleRouter: new RoleRouter('/admin/roles', Controllers.RoleController, app),
            permissionRouter: new PermissionRouter('/admin/permissions', Controllers.PermissionController, app),
            userRouter: new UserRouter('/admin/users', Controllers.UserController, app),
            productCategoryRouter: new ProductCategoryRouter('/productCategories', Controllers.ProductCategoryController, app),
            shipmentMethodRouter: new ShipmentMethodRouter('/shipmentMethods', Controllers.ShipmentMethodController, app),
            storeRouter: new StoreRouter('/stores', Controllers.StoreController, app),
            vendorRouter: new VendorRouter('/vendors', Controllers.VendorController, app),
            productRouter: new ProductRouter('/products', Controllers.ProductController, app),
            productConfigurationRouter: new ProductConfigurationRouter('/productConfigurations', Controllers.ProductConfigurationController, app),
            configuredProductRouter: new ConfiguredProductRouter('/configuredProducts', Controllers.ConfiguredProductController, app),
            listingRouter: new ListingRouter('/listings', Controllers.ListingController, app),
            countryRouter: new CountryRouter('/constants/countries', Controllers.CountryController, app),
            currencyRouter: new CurrencyRouter('/constants/currencies', Controllers.CurrencyController, app),
            taxRouter: new TaxRouter('/constants/taxes', Controllers.TaxController, app),
            discountRouter: new DiscountRouter('/discounts', Controllers.DiscountController, app),
            paymentMethodRouter: new PaymentMethodRouter('/paymentMethods', Controllers.PaymentMethodController, app),
            customerRouter: new CustomerRouter('/customers', Controllers.CustomerController, app),
            commentRouter: new CommentRouter('/comments', Controllers.CommentController, app),
        };
    },
    Admin: {
        RoleRouter,
        PermissionRouter,
        UserRouter
    },
    Constants: {
        CountryRouter,
        CurrencyRouter,
        TaxRouter
    },
    AuthRouter,
    ProductCategoryRouter,
    ShipmentMethodRouter,
    StoreRouter,
    VendorRouter,
    ProductRouter,
    ProductConfigurationRouter,
    ConfiguredProductRouter,
    ListingRouter,
    DiscountRouter,
    PaymentMethodRouter,
    CustomerRouter,
    CommentRouter
};