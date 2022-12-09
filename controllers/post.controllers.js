const Post = require('../models/Post.model');
const { sortByFrequency } = require('../utils/utils');
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
    Post.find({}, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(data);
        }
    })
}

const getPostById = (req, res) => {
    Post.findOne({ postId: req.params.id }, (err, data) => {
        if (err || data === null) {
            res.status(404).json("Post not found")
        }
        else {
            res.status(200).json(data); 
        }
    })
}

const getUserBlogs = (req, res) => {
    Post.find({ author: mongoose.Types.ObjectId(req.user.author) }, (error, data) => {
        if (error) {
            res.status(500).json({
                message: "failed",
                error
            })
        }
        else {
            res.status(200).json({
                message: "success",
                data
            })
        }
    })
}

const createPost = async (req, res) => {
    const { nanoid } = await import('nanoid');
    const post = new Post({
        postId: nanoid(),
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        author: mongoose.Types.ObjectId(req.body.author)
    })
    post.save()
    .then((data) => {
        res.status(200).json({
            status: "success",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

const updatePost = (req, res) => {
    Post.findOneAndUpdate({ postId: req.params.id, author: mongoose.Types.ObjectId(req.user.author) },
        { $set: req.body },
        (error, data) => {
            if (error || data === null) {
                if (data === null) {
                    res.status(401).json({
                        message: "failed",
                        error: "unauthorized"
                    });
                    return;
                }
                res.status(500).json({
                    message: "failed",
                    error
                });
            }
            else {
                res.status(200).json({
                    "status": "ok",
                    data: data
                });
            }
        }
    )
}
    
    
const deletePost = (req, res) => {
    Post.findOneAndDelete({ postId: req.params.id, author: mongoose.Types.ObjectId(req.user.author) }, (error, data) => {
        if (error || data === null) {
            if (data === null) {
                res.status(401).json({
                    message: "failed",
                    error: "unauthorized"
                });
                return;
            }
            res.status(404).json({
                message: "failed",
                error
            });
        }
        else {
            res.status(200).json(data);
        }
    })
}

const tags = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err || posts === null) {
            res.status(500).send(err);
        }
        else {
            let tags = []; 
            let map = {}
            posts.forEach(post => {
                post.tags.forEach((tag) => {
                    tags.push(tag);
                    if (map[tag]) {
                        map[tag]++;
                    }
                    else {
                        map[tag] = 1;
                    }
                })
            });
            tags = sortByFrequency(tags);
            tags.length = tags.length < 11 ? tags.length : 11;
            res.status(200).json(tags);
        }
    })
}


module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    tags,
    getUserBlogs
}