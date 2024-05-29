const mongoose = require('mongoose');

const batch = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectID,
    },
    sender_name: {
        type: String
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectID,
    },
    parcel_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
    }
})

module.exports = mongoose.model('batch', batch)