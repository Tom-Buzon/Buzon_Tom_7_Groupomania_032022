const express = require('express');
const router = express.Router();

const responsesCtrl = require('../controllers/responses');
const auth = require('../middleware/auth');

router.get('/:id', auth, responsesCtrl.getAllResponses);
router.post('/', auth, responsesCtrl.createResponse);
router.get('/getOne/:id', auth, responsesCtrl.getOneResponse);
router.put('/:id', auth, responsesCtrl.modifyResponse);
router.delete('/:id', auth, responsesCtrl.deleteResponse);

module.exports = router;