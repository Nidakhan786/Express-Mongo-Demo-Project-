const express = require('express');
const router = express.Router();
const userControllr = require('../controllers/User');
router.post('/', userControllr.create);

module.exports = router;