const express = require('express');
const router = express.Router();

const commentLikesCtrl = require('../controllers/commentLike');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentLikesCtrl.getAllLikes);
router.post('/', auth, commentLikesCtrl.like);

module.exports = router;