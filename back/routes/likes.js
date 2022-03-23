const express = require('express');
const router = express.Router();

const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

router.get('/:id', auth, likesCtrl.getAllLikes);
router.post('/', auth, likesCtrl.like);

module.exports = router;