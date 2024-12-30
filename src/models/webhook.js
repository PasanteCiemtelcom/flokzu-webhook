const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WebhookData', WebhookSchema);
