const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('comments', CommentSchema);