const express = require('express');
const router = express.Router();

const commentDisikesCtrl = require('../controllers/commentdisLike');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentDisikesCtrl.getAllLikes);
router.post('/', auth, commentDisikesCtrl.like);

module.exports = router;