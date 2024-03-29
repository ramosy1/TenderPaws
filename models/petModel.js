const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This is a required field.'
    },
    category: {
        type: String,
        enum: ['Dogs', 'Cats', 'Others'],
        required: 'This is a required field.'
    },
    breed: {
        type: String,
        required: 'This is a required field.'
    },
    status: {
        type: String,
        required: 'This is a required field.'
    },
    sex: {
        type: String,
        required: 'This is a required field.'
    },
    weight: {
        type: Number,
        required: 'This is a required field.'
    },
    age: {
        type: Number,
        required: 'This is a required field.'
    },
    microchip: {
        type: String,
        required: 'This is a required field.',
        unique: true
    },
    image: {
        type: String,
        required: 'This is a required field.'
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Pet', petSchema);