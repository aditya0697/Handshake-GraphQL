const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('../student/StudentModel');
const Employer = require('../employer/EmployerModel');
const Job = require('./JobModel');

var addressSchema = new Schema({
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var jobSchema = new Schema({
    _id: {type: String, required: true},
    EmployerID: {type: String, required: true},
    EmployerName: {type: String, required: true},
    EmployerProfileUrl: {type: String},
    Postion: {type: String, required: true},
    Salary: {type: Number, required: true},
    Type: {type: String, required: true},
    PostDate: {type: Date, required: false},
    Deadline: {type: Date, required: false},
    Address: addressSchema,
    Description: {type: String, required: true},
});

var applicationSchema = new Schema({
    StudentID: { type: Schema.Types.ObjectId, required: true, ref: Student },
    EmployerID: { type: Schema.Types.ObjectId, required: true, ref: Employer },
    JobID: { type: Schema.Types.ObjectId, required: true, ref: Job },
    Status: {type: String, required: true},
});

const applicationModel = mongoose.model('application', applicationSchema);
module.exports = applicationModel;