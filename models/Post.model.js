const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    postId: {
        type: String, 
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: undefined
    }
}, {
    timestamps: true,
    skipVersioning: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;