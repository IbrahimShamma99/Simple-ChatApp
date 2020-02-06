const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message_type: {
        type: String,
        default: 'text'
    },
    content: {
        type: String,
        required: true
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = Message = mongoose.model('message',MessageSchema);