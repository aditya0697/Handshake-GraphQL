const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var chatMessageSchems =  new Schema({
    SenderId: {type: String, required: true},
    MessageTime: {type:Date, required: true},
    Message: {type: String, required: true},
});

var personSchema = new Schema({
    PersonType: {type: String, required: true},
    Name: {type: String, required: true},
    PersonProfileUrl: {type: String, required: true},
    PersonId: {type: String, required: true},

});

var conversationSchema = new Schema({
    Persons: [{type: personSchema, required: true}],
    Time: {type:Date, required: true},
    Messages: [chatMessageSchems]
});

conversationSchema.plugin(mongoosePaginate);
const conversationModel = mongoose.model('conversation', conversationSchema);
module.exports = conversationModel;