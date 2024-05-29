const mongoose = require('mongoose');
const pharma = new mongoose.Schema({
    name: {
        type: String
    },
    contact_number: {
        type: String
    },
    doc_name: {
        type: String
    },
    doc_reg: {
        type: String
    },
    med_details: [{
        med_name: { type: String },
        dose: { type: Number },
    }]
})

module.exports = mongoose.model('pharma', pharma)