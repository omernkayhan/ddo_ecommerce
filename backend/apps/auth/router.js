/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 17/07/2023
*/

const {Router} = require("express");
const {verify} = require("../../common/middleware/SchemeValidation");
const {authenticateCheck} = require("../../common/middleware/IsAuthenticatedMiddleware");

class AuthRouter extends Router{

    controller = null;
    app = null;
    constructor(endpointPrefix, controllerName, app) {
        super();

        this.controller = new controllerName();
        this.app = app;

        let loginPayload = {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            },
            required: [
                'username', 'password'
            ],
            additionalProperties: false
        };
        let refreshPayload = {
            type: 'object',
            properties: {
                refreshToken: {
                    type: 'string'
                }
            },
            required: [
                'refreshToken'
            ],
            additionalProperties: false
        };
        let registerPayload = {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    maxLength: 50
                },
                password: {
                    type: 'string'
                },
                name: {
                    type: 'string',
                    maxLength: 150
                },
                surname: {
                    type: 'string',
                    maxLength: 50
                },
                email: {
                    type: 'string',
                    format: 'email',
                    maxLength: 150
                },
                phone: {
                    type: 'string',
                    format: 'phone_number',
                    maxLength: 14
                }
            },
            required: [
                'username', 'password', 'name', 'surname', 'email'
            ],
            additionalProperties: false
        };

        this.app.post(endpointPrefix + '/register', [
            verify(registerPayload)
        ], this.controller.register.bind(this.controller));

        this.app.post(endpointPrefix + '/login', [
            verify(loginPayload)
        ], this.controller.login.bind(this.controller));

        this.app.post(endpointPrefix + '/logout', [
            authenticateCheck([endpointPrefix, 'logout'])
        ], this.controller.logout.bind(this.controller));

        this.app.post(endpointPrefix + '/refresh', [
            verify(refreshPayload)
        ], this.controller.refresh.bind(this.controller));

    }
}

module.exports = AuthRouter;