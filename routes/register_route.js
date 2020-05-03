const express = require("express");
const router = express.Router();
const userControllr = require("../controllers/user_controller");
router.post("/", userControllr.create);

module.exports = router;
