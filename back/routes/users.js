const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User')

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOne);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;