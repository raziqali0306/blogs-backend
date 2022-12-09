const router = require('express').Router();
const { createPost, getPosts, getPostById, deletePost, updatePost, tags, getUserBlogs } = require('../controllers/post.controllers');
const { verify } = require('../middleware/auth.middlewares');

router.route('/').get(getPosts).post(createPost);
router.route('/tags').get(tags);
router.route('/myposts').post(verify, getUserBlogs);
router.route('/:id').get(getPostById).patch(verify, updatePost).delete(verify, deletePost);

module.exports = router;