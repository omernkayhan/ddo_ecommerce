/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 12/07/2023
*/

const {Op} = require("sequelize");

function decodeURIComponentSafe(s) {
    if (!s) {
        return s;
    }
    return decodeURIComponent(s.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'));
}

module.exports = {
    buildCondition: (req) => {
        const realCondition = {};
        for (let [key, value] of Object.entries(req.query)) {
            if(key === 'page' || key === 'order') continue;

            if(key.indexOf('__') > -1) {
                value = {
                    [Op[key.split('__')[1]]]: value
                };
                key = key.split('__')[0];
            }


            if(key.indexOf('.') > -1) {
                let keys = key.split('.');
                keys = keys.map((current, index) => {
                    return current;
                });
                key = `$${keys.join('.')}$`;
            }

            realCondition[key] = value;

        }

        return {
            where: realCondition,
            offset: (req.page - 1) * req.limit,
            limit: req.limit
        };
    }
};