require('dotenv').config();
const mongoose = require('mongoose');
const Sensor = require('./models/sensorSchema');

const MONGO_URL = process.env.MONGO_URI;

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'gymdb',
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Sensor.deleteMany({});
        console.log('Cleared existing sensor data');

        // Create temperature data
        const temperature = new Sensor({
            type: 'Temperature',
            model: 'DHT22',
            value: 22.5,
            unit: '°C',
            timestamp: new Date()
        });
        await temperature.save();

        // Create humidity data
        const humidity = new Sensor({
            type: 'Humidity',
            model: 'DHT22',
            value: 55,
            unit: '%',
            timestamp: new Date()
        });
        await humidity.save();

        // Create people count data
        const peopleCount = new Sensor({
            type: 'PeopleCount',
            model: 'VL53L1X',
            value: 15,
            unit: 'persons',
            timestamp: new Date()
        });
        await peopleCount.save();

        console.log('Seed data created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();