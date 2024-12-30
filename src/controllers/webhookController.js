const WebhookData = require('../models/webhook');

exports.handleWebhook = async (req, res) => {
    try {
        const webhookData = new WebhookData({
            data: req.body
        });
        await webhookData.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Error processing webhook' });
    }
};


exports.getWebhooks = async (req, res) => {
    try {
        const webhooks = await WebhookData.find();
        const webhooksMap = {};

        webhooks.forEach((webhook) => {
            const taskDate = webhook?.data?.Timestamp;

            if (!taskDate) {
                console.warn('Timestamp missing for webhook:', webhook);
                return;
            }

            const payloadWebhook = webhook?.data?.Payload;

            if (!payloadWebhook?.reference) {
                console.warn('Payload or reference missing for webhook:', webhook);
                return;
            }

            const utc5Date = convertToEcuadorTime(taskDate);
            console.log(utc5Date, "utc5Date");

            const formatTaskDate = formatDateTime(utc5Date);
            console.log(formatTaskDate, "formatTaskDate");

            if (!webhooksMap[payloadWebhook.reference]) {
                webhooksMap[payloadWebhook.reference] = [];
            }

            webhooksMap[payloadWebhook.reference].push({
                mail: webhook?.data?.Payload?.last_participant || webhook?.data?.Payload?.documentCreator  ,
                TimestampEcuador: formatTaskDate, 
                reference: webhook?.data?.Payload?.reference
            });
        });

        res.status(200).json(webhooksMap);
    } catch (error) {
        console.error('Error retrieving webhooks:', error);
        res.status(500).json({ error: 'Error retrieving webhook data' });
    }
};



const convertToEcuadorTime = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    const ecuadorOffset = -5 * 60; // UTC-5 en minutos
    const ecuadorTime = new Date(utcDate.getTime() + ecuadorOffset * 60 * 1000);
    return ecuadorTime;
};
const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
