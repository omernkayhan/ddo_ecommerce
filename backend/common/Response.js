/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 13/07/2023
*/

const {ERROR_CODES} = require("./config");
const {logger} = require("./middleware/logger");
module.exports = {
    success: (res, data) => {
        return res.status(200).json({
            status: true,
            data: data ?? []
        });
    },
    error: (res, errorMessage, errorAdditional = {}, status = 200) => {
        logger.error(errorMessage);
        return res.status(status).json({
            status: false,
            error: {
                message: errorMessage,
                ...errorAdditional
            }
        });
    },
    sequelizeError: (res, err) => {

        console.log(err);

        const errorDetail = err.original?.detail ?? '';
        const errorName = err.name ?? '';
        const errorCode = err.original?.code ?? '';

        let customError = null;

        logger.error(`DB Error : ${errorDetail}`);

        switch (errorName){
            case 'SequelizeForeignKeyConstraintError':
                switch (errorCode){
                    case '23503':

                        const isNotFoundRegex = /^Key \((.*?)\)=\((\d)\) is not present in table "(.*?)".$/;
                        if(isNotFoundRegex.test(errorDetail)){
                            const error = isNotFoundRegex.exec(errorDetail);
                            customError = {message: `'${error[3]}.${error[2]}' not found!`, code: ERROR_CODES.FOREIGN_ID_NOT_FOUND};
                        }

                        const referencedRegex = /^Key \((.*?)\)=\((\d)\) is still referenced from table "(.*?)".$/;
                        if(referencedRegex.test(errorDetail)){
                            const error = referencedRegex.exec(errorDetail);
                            customError = {message: `'${error[2]}' is referenced from '${error[3]}'!`, code: ERROR_CODES.FOREIGN_IS_REFERENCED};
                        }

                        break;
                }
                break;
            case 'SequelizeUniqueConstraintError':
                switch (errorCode){
                    case '23505':

                        const alreadyExistsRegex = /^Key \((.*?)\)=\((.*?)\) already exists.$/;
                        if(alreadyExistsRegex.test(errorDetail)){
                            const error = alreadyExistsRegex.exec(errorDetail);
                            customError = {message: `'${err.original?.table}(${error[1]}=${error[2]})' is already exists!`, code: ERROR_CODES.ALREADY_EXISTS};
                        }

                        break;
                }
                break;
        }

        if(customError === null){
            return res.status(200).json({
                status: false,
                error: {
                    message: errorDetail,
                    details: {
                        name: errorName.replace('Sequelize', ''),
                        code: errorCode
                    }
                }
            });
        }else{
            return res.status(200).json({
                status: false,
                error: customError
            });
        }

    },
};