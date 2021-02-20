const {genRes} = require('../utils/general');

module.exports = function (err, req, res, next) {

    const statusCode = err.statusCode || 400;

    return res
        .status(statusCode)
        .json(
            genRes(
                [],
                statusCode,
                Array.isArray(err.message) ? err.message : (err.message ? [err.message] : null)
            )
        );
};