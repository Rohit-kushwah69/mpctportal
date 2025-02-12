const mongoose = require("mongoose")
const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        Required: true,
    },
    address: {
        type: String,
        Required: true,
    },
    address2: {
        type: String,
        Required: true,
    },
    country: {
        type: String,
        Required: true,
    },
    state: {
        type: String,
        Required: true,
    }

},{timestamps:true})
const ContactModel=mongoose.model('contact',ContactSchema)
module.exports = ContactModel