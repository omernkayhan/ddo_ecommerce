/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const MainRouter = require("../../common/MainRouter");
const {authenticateCheck} = require("../../common/middleware/IsAuthenticatedMiddleware");

class ConfiguredProductRouter extends MainRouter{
    constructor(...props) {
        super(...props);

        this.app.get(this.endpointPrefix + '/getConfigurationValues/:productId', [
            authenticateCheck([this.endpointPrefix, 'detail'])
        ], this.controller.getConfigurationValues.bind(this.controller));
    }

}

module.exports = ConfiguredProductRouter;