const mongoose = require('mongoose');

let Contactcreate = new mongoose.Schema({
    firstname :{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    phone :{
        type: String,
        required: true,
    },
    address :{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Contactcreate', Contactcreate);