require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const routes = require('./routes/sensorRoutes.js');

const authRoutes = require('./routes/authRoutes.js'); // Add this line near the top with other requires
const app = express();
app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use('/sensors', routes);
app.use('/auth', authRoutes);
//Mongodb connection
const MONGO_URL = process.env.MONGO_URI;
const connectToMongodb = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'gymdb',
        });
        console.log(`Successfully connected to gymdb database in the MongoDB.`);
    } catch (error) {
        console.error(" MongoDB connection error", error.stack);
        process.exit(1);
    }
};
connectToMongodb();

//server
const port = process.env.PORT || 3000; // Use environment variable for port to host
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});