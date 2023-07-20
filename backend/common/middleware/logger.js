/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 19/07/2023
*/

const {createLogger, transports, format} = require("winston");

const logFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `[${info.timestamp}] [${info.level}] ${info.message}`;
}));

const year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
month = (month < 10) ? '0' + month.toString() : month.toString();

const logger = createLogger({
    format: logFormat,
    transports: [
        new transports.Console({level: 'silly'}),
        new transports.File({filename: 'logs/' + year + '/' + month + '.log', level: 'info'}),
    ]
});

module.exports = {logger};