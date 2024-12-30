const express = require('express');
const router = express.Router();
const { handleWebhook, getWebhooks } = require('../controllers/webhookController');

router.post('/', handleWebhook);
router.get('/', getWebhooks);



module.exports = router;