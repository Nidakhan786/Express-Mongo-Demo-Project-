const express = require("express");
const router = express.Router();
const userControllr = require("../controllers/user_controller");

router.get("/", userControllr.findAll);
router.post("/", userControllr.create);
router.get("/:id", userControllr.findOne);
router.put("/:id", userControllr.UpdateUser);
router.delete("/:id", userControllr.delete);
module.exports = router;
