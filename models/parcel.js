const mongoose = require('mongoose');

const parcel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectID,
    },
    name: {
        type: String
    },
    med_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'medicine'
    },
    quantity: {
        type: Number,
        required: true
    },
    parcel_id: {
        type: String
    },
    active: {
        type: Boolean
    }
})

module.exports = mongoose.model('parcel', parcel)