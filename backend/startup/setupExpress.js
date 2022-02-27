const bodyParser = require("body-parser");
const {genRes} = require('../utils/general');
const {ResError,UnprocessableEntity,NotFound} = require('../utils/errors');
const helmet = require("helmet")

const cors = require('cors')

const corsOptions = {
    origin: 'https://moviesdb.hakkisabah.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* wraps express endpoints in an async handler to catch async errors */
require('express-async-errors');

module.exports = (app) => {

    /* Xss & Cors Protection */
    app.use(helmet.xssFilter())
    app.use(cors(corsOptions))

    /* Other configurations */
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.json());

    /* Helper middleware */
    app.use((req, res, next) => {
        // A helper to send response as data
        res.sendData = data => res.json(genRes(data, 200, []));

        // A helper to send response as error
        res.sendError = (msg, statusCode) => {
            // res.statusCode = statusCode || 404
            // return res.json({msg,statusCode:res.statusCode})
            throw new ResError(msg, statusCode);
        };
        res.UnprocessableEntity = (msg) => {
            throw new UnprocessableEntity(msg);
        };
        res.NotFound = (msg)=>{
            throw new NotFound(msg);
        }

        next();
    });
};