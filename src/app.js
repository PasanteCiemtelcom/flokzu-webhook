const express = require('express');
const connectDB = require('./config/database');
const webhookRoutes = require('./routes/webhook');

const app = express();
app.use(express.json());
app.use('/webhook', webhookRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
