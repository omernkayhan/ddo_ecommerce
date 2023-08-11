/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 14/07/2023
*/

const Role = require("./models/Role");
const Permission = require("./models/Permission");
const User = require("./models/User");
const UserToken = require("./models/UserToken");
const DocumentRequest = require("./models/Documents/DocumentRequest");
const Employee = require("./models/Employees/Employee");
const Department = require("./models/Employees/Department");
const Document = require("./models/Documents/Document");
const DocumentRevision = require("./models/Documents/DocumentRevision");
const DocumentType = require("./models/Documents/DocumentType");
const DocumentBusiness = require("./models/Documents/DocumentBusiness");
const Stock = require("./models/Stocks/Stock");
const CustomerSupplier = require("./models/CustomerSuppliers/CustomerSupplier");
const Institute = require("./models/Documents/Standards/Institute");
const Standard = require("./models/Documents/Standards/Standard");
const DocumentRequestRejectReason = require("./models/Documents/DocumentRequestRejectReason");
/* NEW MODEL REQUIRE */

module.exports = {
    syncDB: async (sequelize) => {

        //Role Model
        await Role.init();


        //Permission Model
        await Permission.init();
        await sequelize.models.Permission.belongsToMany(sequelize.models.Role, {
            through: 'RolePermissions',
            as: 'permissions'
        });
        await sequelize.models.Role.belongsToMany(sequelize.models.Permission, {
            through: 'RolePermissions',
            as: 'permissions'
        });


        //User Model
        await User.init();
        await User.belongsTo(Role, {
            as: 'role'
        });


        //UserToken Model
        await UserToken.init();
        await sequelize.models.UserToken.belongsTo(sequelize.models.User, {
            as: 'user',
            foreignKey: 'userId'
        });


        await Department.init();
        await sequelize.models.Department.belongsTo(sequelize.models.Department, {
            as: 'parent',
            foreignKey: 'parentId'
        });


        await Employee.init();
        await sequelize.models.Employee.belongsTo(sequelize.models.Department, {
            as: 'department',
            foreignKey: 'departmentId'
        });


        await DocumentType.init();


        await DocumentBusiness.init();


        await CustomerSupplier.init();


        await Stock.init();
        await sequelize.models.Stock.belongsTo(sequelize.models.CustomerSupplier, {
            as: 'customer',
            foreignKey: 'customerId'
        });
        await sequelize.models.CustomerSupplier.hasMany(sequelize.models.Stock, {
            as: 'stocks',
            foreignKey: 'customerId'
        });


        await Institute.init();


        await Standard.init();
        await sequelize.models.Standard.belongsTo(sequelize.models.Institute, {
            as: 'institute',
            foreignKey: 'instituteId'
        });


		await Document.init();
        await sequelize.models.Document.belongsTo(sequelize.models.DocumentType, {
            as: 'type',
            foreignKey: 'typeId'
        });
        await sequelize.models.Document.belongsTo(sequelize.models.DocumentBusiness, {
            as: 'business',
            foreignKey: 'businessId'
        });
        await sequelize.models.Document.belongsTo(sequelize.models.Stock, {
            as: 'stock',
            foreignKey: 'stockId'
        });
        await sequelize.models.Document.belongsTo(sequelize.models.Employee, {
            as: 'createdBy',
            foreignKey: 'createdById'
        });
        await sequelize.models.Document.belongsTo(sequelize.models.Employee, {
            as: 'updatedBy',
            foreignKey: 'updatedById'
        });
        await sequelize.models.Document.belongsToMany(sequelize.models.Standard, {
            as: 'standards',
            through: 'DocumentStandards'
        });
        await sequelize.models.Standard.belongsToMany(sequelize.models.Document, {
            as: 'documents',
            through: 'DocumentStandards'
        });

        await sequelize.models.DocumentType.belongsTo(sequelize.models.Document, {
            as: 'document',
            foreignKey: 'documentId'
        });


		//await DocumentRevision.init();


        await DocumentRequest.init();
        await sequelize.models.DocumentRequest.belongsTo(sequelize.models.Employee, {
            as: 'createdBy',
            foreignKey: 'createdById'
        });
        await sequelize.models.DocumentRequest.belongsTo(sequelize.models.Employee, {
            as: 'updatedBy',
            foreignKey: 'updatedById'
        });
        await sequelize.models.DocumentRequest.belongsTo(sequelize.models.Employee, {
            as: 'for',
            foreignKey: 'forId'
        });


		await DocumentRequestRejectReason.init();
        await sequelize.models.DocumentRequest.hasOne(sequelize.models.DocumentRequestRejectReason, {
            as: 'rejectReason',
            foreignKey: 'requestId'
        });

		/* NEW MODEL INIT */

        if (process.env.DEV === 'false') {
            return true;
        }
        return await sequelize.sync();
    }
};