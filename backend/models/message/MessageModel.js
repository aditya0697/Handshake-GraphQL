const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    PersonId: {type: String, required: true},
    ConversationIds: [String],
});

messageSchema.plugin(mongoosePaginate);
const messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;