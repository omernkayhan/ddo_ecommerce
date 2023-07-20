/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const {Router} = require("express");
const {buildPayload} = require("./middleware/PayloadBuilder");
const {verify, verifyQuery} = require("./middleware/SchemeValidation");
const {authenticateCheck} = require("./middleware/IsAuthenticatedMiddleware");

class MainRouter extends Router{

    controller = null;
    app = null;
    endpointPrefix = null;
    constructor(endpointPrefix, controllerName, app) {
        super();

        this.controller = new controllerName();
        this.app = app;
        this.endpointPrefix = endpointPrefix;

        let listPayload = buildPayload(this.controller.defaultModel, this.controller.listPayload);
        let createPayload = buildPayload(this.controller.defaultModel, this.controller.createPayload);
        let updatePayload = buildPayload(this.controller.defaultModel, this.controller.updatePayload);

        this.app.post(endpointPrefix + '/', [
            verify(createPayload),
            authenticateCheck([endpointPrefix, 'create'])
        ], this.controller.create.bind(this.controller));

        this.app.get(endpointPrefix + '/', [
            verifyQuery(listPayload),
            authenticateCheck([endpointPrefix, 'list'])
        ], this.controller.list.bind(this.controller));

        this.app.get(endpointPrefix + '/:id', [
            authenticateCheck([endpointPrefix, 'detail'])
        ], this.controller.get.bind(this.controller));

        this.app.patch(endpointPrefix + '/:id', [
            verify(updatePayload),
            authenticateCheck([endpointPrefix, 'update'])
        ], this.controller.update.bind(this.controller));

        this.app.delete(endpointPrefix + '/:id', [
            authenticateCheck([endpointPrefix, 'delete'])
        ], this.controller.delete.bind(this.controller));

    }
}

module.exports = MainRouter;