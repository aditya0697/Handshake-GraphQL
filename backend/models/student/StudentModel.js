const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var educationSchema = new Schema({
    School: {type: String, required: true},
    Major: {type: String, required: true},
    Level: {type: String, required: true},
    GradDate: {type: Date, required: false},
    GPA: {type: Number, required: false},
});

var experienceSchema = new Schema({
    Employer: {type: String, required: true},
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    StartDate: {type: Date, required: false},
    EndDate: {type: Date, required: false},
    
});

var studentSchema = new Schema({
    // studentID: {type: String, required: true},
  Email: {type: String, required: true, unique: true },
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  PhoneNumber: {type: String, required: false},
  CareerObjective: {type: String, required: false},
  Educations: educationSchema,
  Experiences: experienceSchema,
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;