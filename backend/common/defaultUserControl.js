const Role = require("./models/Role");
const User = require("./models/User");
module.exports = {
    controlAndCreate: async () => {
        if (await Role.count({where: {code: 'sysadmin'}}) === 0) {
            const role = await Role.create({code: 'sysadmin', name: 'System Admin', description: 'System Admin'});
            if (await User.count() === 0) {
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

            }
        }
    }
}