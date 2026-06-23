const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);

module.exports = router;