/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const MainRouter = require("../../common/MainRouter");
const {authenticateCheck} = require("../../common/middleware/IsAuthenticatedMiddleware");

class CartItemRouter extends MainRouter{
    constructor(...props) {
        super(...props);

        this.app.delete(this.endpointPrefix + '/', [
            authenticateCheck([this.endpointPrefix, 'delete'])
        ], this.controller.deleteItems.bind(this.controller));
    }
}

module.exports = CartItemRouter;