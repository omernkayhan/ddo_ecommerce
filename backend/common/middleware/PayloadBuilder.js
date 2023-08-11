/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 13/07/2023
*/
module.exports = {
    buildPayload: (model, payloadInformation) => {

        let attributes = {};

        payloadInformation.properties.map((attribute) => {
            if(typeof attribute === 'object'){
                attributes[attribute[0]] = {
                    ...attribute[1]
                };
            }else {
                const modelAttribute = {
                    ...model.attributes[attribute]
                };

                let type = null;
                let extra = {};

                if(typeof modelAttribute.type === 'undefined'){
                    return {};
                }

                switch (modelAttribute.type.constructor.name) {
                    case 'STRING':
                    case 'TEXT':
                        type = 'string';
                        extra = (modelAttribute.type.options.length !== undefined) ? {maxLength: modelAttribute.type.options.length} : {};
                        break;
                    case 'BOOLEAN':
                        type = ['boolean', 'string'];
                        break;
                    case 'INTEGER':
                    case 'FLOAT':
                        type = 'number';
                        break;
                    case 'DATE':
                        type = 'string';
                        break;
                    case 'ENUM':
                        type = ['number', 'integer', 'string', 'boolean', 'array', 'object'];
                        break;
                }

                if (type !== null && type !== 'enum') {
                    attributes[attribute] = {
                        type: type,
                        ...extra
                    };
                }
            }

        });

        let payload = {
            type: 'object',
            properties: attributes,
            additionalProperties: payloadInformation.additionalProperties ?? false
        };

        if(typeof payloadInformation.required !== 'undefined'){
            payload.required = payloadInformation.required;
        }

        return payload
    }
};