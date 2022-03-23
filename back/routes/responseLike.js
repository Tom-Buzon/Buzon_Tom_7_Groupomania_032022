const express = require('express');
const router = express.Router();

const responseLikesCtrl = require('../controllers/responseLike');
const auth = require('../middleware/auth');

router.get('/:id', auth, responseLikesCtrl.getAllLikes);
router.post('/', auth, responseLikesCtrl.like);



module.exports = router;