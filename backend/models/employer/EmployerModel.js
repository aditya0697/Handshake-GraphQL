const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema = new Schema({
    Street: {type: String, required: true},
    Apt: {type: String, required: false},
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var employerSchema = new Schema({
    Email: {type: String, required: true, unique: true},
    EmployerName: {type: String, required: true},
    PhoneNumber: {type: String, required: false},
    ProfileUrl: {type: String, required: false},
    EmployerDescription: {type: String, required: false},
    Address: addressSchema,
});

const employerModel = mongoose.model('employer', employerSchema);
module.exports = employerModel;