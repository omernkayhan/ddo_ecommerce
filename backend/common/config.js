/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

module.exports = {
    DEV: true,
    APP_PORT: 80,
    JWT_ACCESS_SECRET: 'aTGT.9\'bWLc.)&2{__aTGT.9\'bWLc.)&2{__8DR$2+N^M0Ohur=o%eu^M08DR$2+N^M0Ohur=o%eu^M0',
    JWT_ACCESS_EXPIRATION: 60 * 60,
    JWT_REFRESH_SECRET: '15SldccznTxG20_VTbS=cpJ15SldccznTxG20_VTbS=cpJDppQh2N5c35Tjy6AJDppQh2N5c35Tjy6AJ',
    JWT_REFRESH_EXPIRATION: 60 * 60,
    BCRYPT_SALT_ROUNDS: 10,
    DEFAULT_PAGE_ITEM_COUNT: 10,
    ERROR_CODES: {
        FOREIGN_ID_NOT_FOUND: '5001',
        FOREIGN_IS_REFERENCED: '5002',
        ALREADY_EXISTS: '5003'
    },
    DEFAULT_ACTIVE_LISTING: false,
    PRODUCT:{
        CONFIGURATION_TYPE_OPTIONS: ['radio', 'select']
    },
    ORDER:{
        STATUS_OPTIONS: ['created', 'waitingPayment', 'processing', 'gettingReady', 'readyForShipment', 'shipped', 'completed', 'canceled'],
        NOT_PAYED_STATUS: 'waitingPayment',
        PAYED_STATUS: 'processing',
        STATUS_CHANGE_NOTE: '{number} Numaralı sipariş \'{status}\' durumuna geçti'
    },
    DATABASE: {
        HOST: 'localhost',
        PORT: 5432,
        USER: 'ddo_ecommerce_backend',
        PASSWORD: '1234',
        DATABASE: 'ddo_ecommerce',
        DIALECT: 'postgres',
    }
};
