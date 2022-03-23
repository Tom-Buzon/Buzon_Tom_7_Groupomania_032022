const express = require('express');
const router = express.Router();

const dislikesCtrl = require('../controllers/dislikes');
const auth = require('../middleware/auth');

router.get('/:id', auth, dislikesCtrl.getAllDislikes);
router.post('/', auth, dislikesCtrl.dislike);

module.exports = router;