const express = require('express');
const router = express.Router();

const responseDisikesCtrl = require('../controllers/responsedisLike');
const auth = require('../middleware/auth');

router.get('/:id', auth, responseDisikesCtrl.getAllLikes);
router.post('/', auth, responseDisikesCtrl.like);

module.exports = router;