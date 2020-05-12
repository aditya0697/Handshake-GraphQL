const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var addressSchema = new Schema({
    Street: {type: String, required: true},
    Apt: {type: String, required: false},
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var eventSchema = new Schema({
    EventName:{type: String, required: true},
    EmployerID: {type: String, required: true},
    EmployerName: {type: String, required: true},
    EmployerProfileUrl: {type: String},
    Majors: [{type: String}],
    EventDate: {type: Date, required: false},
    Address: addressSchema,
    Description: {type: String, required: true},
});

const eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel;