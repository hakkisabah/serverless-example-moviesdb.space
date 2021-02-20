const router = require("express").Router();
const MovieClass = require("../controllers/Movie");

router.use("/list", require("./list"));
router.use("/search", require("./search"));
router.use("/movie/:request/:arg", async function (req, res, next) {
  await new MovieClass(req, res, next);
});

router.use("*", function (req, res) {
  res.UnprocessableEntity("Please enter correct path");
});

module.exports = router;
