const express = require('express');
const router = express.Router();
const userControllr = require('../controllers/User');
const postControllr = require('../controllers/Posts');

router.get('/post/:id', postControllr.findAllPostsByUser);
router.get('/', userControllr.findAll);
router.post('/', userControllr.create);
router.get('/:id', userControllr.findOne);
router.put('/:id', userControllr.UpdateUser);
router.delete('/:id', userControllr.delete);
module.exports = router;