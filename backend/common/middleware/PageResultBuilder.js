/*
* 2023 - DISQET Software Technologies
* created by: Ömer Necmi KAYHAN
* created date: 13/07/2023
*/

module.exports = {
    buildPageResult: (data, req) => {
        if(typeof data.count === "undefined" || typeof data.rows === "undefined"){
            return data;
        }
        return {
            totalItems: data.count,
            items: data.rows,
            totalPages: Math.ceil(data.count / req.limit),
            currentPage: req.page
        }
    }
};