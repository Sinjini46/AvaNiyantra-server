const mongoose = require('mongoose');
const u = require('./user');
const medicine = require('./medicine');

const medicine_stock = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'u'
    },
    med_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'medicine'
    },
    quantity: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('medicine_stock', medicine_stock)