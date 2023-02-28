
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    post: {
        type: String, 
        required: true
    },
    date : {
        type: String,
        default : ((new Date).toISOString()).split('T')[0]
    }
})

module.exports = mongoose.model('Journal', journalSchema);