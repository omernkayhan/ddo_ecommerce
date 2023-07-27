/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 27/07/2023
*/

const Role = require("./models/Role");
const User = require("./models/User");
const {logger} = require("./middleware/logger");
module.exports = {
    controlAndCreate: async () => {
        if (await Role.count({where: {code: 'sysadmin'}}) === 0) {
            logger.info('Default role sysadmin not found! Creating...');
            const role = await Role.create({code: 'sysadmin', name: 'System Admin', description: 'System Admin'});
            if (await User.count({where: {roleId: role.id}}) === 0) {
                logger.info('Default sysadmin user not found! Creating...');
                await User.create(
                    {
                        username: 'sysadmin',
                        password: '1234',
                        name: 'System',
                        surname: 'Admin',
                        email: 'admin@system',
                        phone: 'phone',
                        active: true,
                        roleId: role.id,
                    }
                );
                logger.info('Default sysadmin user created.');
            }else{
                logger.info('Default sysadmin user founded.');
            }
        }else{
            logger.info('Default role sysadmin founded.');
        }
    }
}