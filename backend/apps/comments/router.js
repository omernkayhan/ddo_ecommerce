/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const MainRouter = require("../../common/MainRouter");
const {authenticateCheck} = require("../../common/middleware/IsAuthenticatedMiddleware");

class CommentRouter extends MainRouter{

    constructor(...props) {
        super(...props);

        this.app.get(this.endpointPrefix + '/findByListingId/:listingId', [
            authenticateCheck([this.endpointPrefix, 'detail'])
        ], this.controller.findByListingId.bind(this.controller));
    }

}

module.exports = CommentRouter;