const mongoose = require('mongoose');

const medicine = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    name: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    parent: {
        type: mongoose.Schema.Types.ObjectID
    }
})

module.exports = mongoose.model('medicine', medicine)