/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 11/07/2023
*/

const jwt = require("jsonwebtoken");

module.exports = {
    generateAccessToken: (userData) => {
        return jwt.sign(
            {
                ...userData
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION),
            }
        )
    },
    generateRefreshToken: (userData) => {
        return jwt.sign(
            {
                ...userData
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION),
            }
        )
    }
};