/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

module.exports = {
    ERROR_CODES: {
        FOREIGN_ID_NOT_FOUND: '5001',
        FOREIGN_IS_REFERENCED: '5002',
        ALREADY_EXISTS: '5003'
    },
    PRODUCT:{
        CONFIGURATION_TYPE_OPTIONS: ['radio', 'select']
    },
    ORDER:{
        STATUS_OPTIONS: ['created', 'waitingPayment', 'processing', 'gettingReady', 'readyForShipment', 'shipped', 'completed', 'canceled'],
        NOT_PAYED_STATUS: 'waitingPayment',
        PAYED_STATUS: 'processing',
        STATUS_CHANGE_NOTE: '{number} Numaralı sipariş \'{status}\' durumuna geçti'
    }
};
