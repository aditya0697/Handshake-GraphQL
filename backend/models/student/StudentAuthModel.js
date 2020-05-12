const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentAuthSchema = new Schema({
    // studentID: {type: String, required: true},
  Email: {type: String, required: true, unique: true },
  Password: {type: String, required: true},
});

const studentAuthModel = mongoose.model('studentAuth', studentAuthSchema);
module.exports = studentAuthModel;