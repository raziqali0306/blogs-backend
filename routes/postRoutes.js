const router = require('express').Router();
const { createPost, getPosts, getPostById, deletePost, updatePost } = require('../controllers/postControllers');

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);


module.exports = router;