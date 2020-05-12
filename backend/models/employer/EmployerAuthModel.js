const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employerAuthSchema = new Schema({
    // studentID: {type: String, required: true},
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
});

const employerAuthModel = mongoose.model('employerAuth', employerAuthSchema);
module.exports = employerAuthModel;