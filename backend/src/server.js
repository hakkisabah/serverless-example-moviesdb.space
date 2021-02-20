const express = require('express');
const app = express();

require('../startup/setupExpress')(app);
require('../startup/routes')(app);


module.exports = app;