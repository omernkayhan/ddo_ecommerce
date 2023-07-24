/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const Controller = require("../../common/Controller");
const Listing = require("../../common/models/Listing");
const Customer = require("../../common/models/Customer");
const Order = require("../../common/models/Order");
const OrderItem = require("../../common/models/OrderItem");
const Payment = require("../../common/models/Payment");
const Currency = require("../../common/models/Currency");
const {USER} = require("../../common/serializer");
const ShipmentMethod = require("../../common/models/ShipmentMethod");
const ConfiguredProduct = require("../../common/models/ConfiguredProduct");
const serializer = require("../../common/serializer");
const PaymentMethod = require("../../common/models/PaymentMethod");

class OrderController extends Controller {
    defaultModel = Order;
    
    createPayload = {
        properties: ['number', 'status', 'total', ['totalCurrency', {type: 'string'}], ['customer', {type: 'integer'}], ['items', {type: 'array'}], ['payment', {type: 'object'}]],
        additionalProperties: false,
        required: ['number', 'status', 'total', 'totalCurrency', 'customer', 'items']
    };
    updatePayload = {
        properties: ['star', 'status', 'comment', ['customer', {type: 'integer'}], ['listing', {type: 'integer'}]],
        additionalProperties: false
    };

    detailSerializer = {
        attributes: {exclude: ['totalCurrencyCode', 'customerId']},
        include: [
            {model: Currency, as: 'totalCurrency'},
            {
                model: OrderItem,
                as: 'items',
                attributes: {exclude: ['priceCurrencyCode', 'shipmentMethodId', 'orderId']},
                include: [
                    {model: Currency, as: 'priceCurrency'},
                    {model: ShipmentMethod, as: 'shipmentMethod'},
                    {
                        model: Listing,
                        as: 'listing',
                        include: [{model: Currency, as: 'priceCurrency'}, {
                            model: ConfiguredProduct,
                            as: 'configuredProduct', ...serializer.PRODUCT.INCLUDE_FULL
                        }]
                    }
                ]
            },
            {
                model: Customer,
                as: 'customer',
                include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user'}]
            },
            {
                model: Payment,
                as: 'payment',
                include: [
                    {model: PaymentMethod, as: 'paymentMethod'}
                ]
            }
        ]
    };

    listSerializer = {
        attributes: {exclude: ['totalCurrencyCode', 'customerId']},
        include: [
            {model: Currency, as: 'totalCurrency'},
            {
                model: Customer,
                as: 'customer',
                include: [{...USER.INCLUDE_BASIC_LEVEL, as: 'user'}]
            },
            {
                model: Payment,
                as: 'payment',
                include: [
                    {model: PaymentMethod, as: 'paymentMethod'}
                ]
            }
        ]
    };

    list(req, res, next) {
        if (req.user.role.code === 'customer') {
            req.query.customerId = req.user.customer.id;
        } else if (req.user.role.code === 'sysadmin') {
        } else {
            return next();
        }
        super.list(req, res);
    }

    create(req, res, next) {
        if (req.user.role.code === 'customer') req.body.customer = req.user.customer.id;

        super.create(req, res, async (order) => {
            const body = req.body;
            await order.setTotalCurrency(body.totalCurrency);
            await order.setCustomer(body.customer);
            await Promise.all(body.items.map(async (item) => {
                const orderItem = await OrderItem.create({
                    listingId: item.listing,
                    quantity: item.quantity,
                    price: item.price,
                    priceCurrencyCode: item.priceCurrency,
                    shipmentMethodId: item.shipmentMethod,
                    shippingTrackingNumber: item.shippingTrackingNumber ?? '',
                    orderId: order.id
                });
                orderItem.setTaxes(item.taxes);
            }));
            await Payment.create({
                result: body.payment.result,
                paymentId: body.payment.paymentId,
                paid: body.payment.paid,
                paidCurrencyCode: body.payment.paidCurrency,
                paymentMethodId: body.payment.paymentMethod,
                orderId: order.id
            });
        });
    }

    update(req, res, next) {
        if (req.user.role.code === 'customer') req.body.customer = req.user.customer.id;

        super.update(req, res);
    }

}

module.exports = OrderController;