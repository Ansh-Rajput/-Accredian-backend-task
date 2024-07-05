const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

router.post("/add_referral", referralController.addReferral);

module.exports = router;
