/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const jwt = require("jsonwebtoken");
const {JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION} = require("../config");

module.exports = {
    generateAccessToken: (userData) => {
        return jwt.sign(
            {
                ...userData
            },
            JWT_ACCESS_SECRET,
            {
                expiresIn: JWT_ACCESS_EXPIRATION,
            }
        )
    },
    generateRefreshToken: (userData) => {
        return jwt.sign(
            {
                ...userData
            },
            JWT_REFRESH_SECRET,
            {
                expiresIn: JWT_REFRESH_EXPIRATION,
            }
        )
    }
};