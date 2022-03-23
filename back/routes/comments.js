const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentsCtrl.getAllComments);
router.post('/', auth, commentsCtrl.createComment);
router.get('/getOne/:id', auth, commentsCtrl.getOneComment);
router.put('/:id', auth, commentsCtrl.modifyComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;