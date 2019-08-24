const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    lastname: String,
    firstname: String,
    address: String,
    zip: String,
    email: String,
    bio: String,
    hobbies: String,
    guid: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Data', DataSchema);
