const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    customerNumber: { type: String, default: () => Math.floor(10000 + Math.random() * 90000).toString() },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);