const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
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