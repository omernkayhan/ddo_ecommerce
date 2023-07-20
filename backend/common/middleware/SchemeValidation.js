/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const Ajv = require('ajv').default, AJV_OPTS = {allErrors: true};
const addFormats = require("ajv-formats")

const verifyData = (schema, data, req, res, next) => {
    if(!schema){
        throw new Error('Schema not provided');
    }

    let dimensionalData = {};

    for (const [propertyName, value] of Object.entries(data)) {
        if(propertyName.indexOf('.') > -1){
            const keys = propertyName.split('.');
            const result = {};

            let temp = result;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (i === keys.length - 1) {
                    temp[key] = value;
                } else {
                    temp[key] = {};
                    temp = temp[key];
                }
            }
            dimensionalData = {...dimensionalData, ...result};
        }else{
            dimensionalData[propertyName] = value;
        }
    }

    const ajv = new Ajv(AJV_OPTS);

    addFormats(ajv);

    ajv.addFormat('email', /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
    ajv.addFormat('phone_number', /^[0-9+]*$/);

    const validate = ajv.compile(schema);
    const isValid = validate(dimensionalData);

    if (isValid) {
        return next();
    }

    return res.send({
        status: false,
        error: {
            message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`
        }
    })

};

module.exports = {
    verify: (schema) => {
        return (req, res, next) => {
            return verifyData(schema, req.body, req, res, next);
        }
    },

    verifyQuery: (schema) => {
        return (req, res, next) => {
            const query = {};
            for (const [key, value] of Object.entries(req.query)) {
                if(key.indexOf('__') > 0){
                    query[key.split('__')[0]] = Array.isArray(value) ? value[0] : value;
                }else{
                    query[key] = Array.isArray(value) ? value[0] : value;
                }
            }
            return verifyData(schema, query, req, res, next);
        }
    }
};