const router = require('express').Router();
const { getTrending,getGenres } = require("../controllers/list");

router.get("/trending/:type/:time?",getTrending);
router.get("/genres/:category/:page?",getGenres);

module.exports = router