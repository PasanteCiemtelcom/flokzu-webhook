const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pasantesistemas:Blue2020@apiflokzu.ylasa.mongodb.net/?retryWrites=true&w=majority&appName=apiFlokzu');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


module.exports = connectDB;