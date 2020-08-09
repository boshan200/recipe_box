const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    },
    comment: String,
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Comment", CommentSchema);