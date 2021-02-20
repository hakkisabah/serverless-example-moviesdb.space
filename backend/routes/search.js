const router = require('express').Router();
const search = require("../controllers/search");

router.get("/:arg",search);

module.exports = router