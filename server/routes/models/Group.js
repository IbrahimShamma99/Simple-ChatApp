const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    users: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        } 
    }],
    lastMessage: {
        type: String,
        default:''
    },
    messages : [{
        message: {
            type: Schema.Types.ObjectId,
            ref: 'message'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    group_type: {
        type: String,
        default: 'public'
    }
})

module.exports = Group = mongoose.model('group',GroupSchema);