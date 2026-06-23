const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text && !image) return res.status(400).json({ message: 'Post must contain text or an image' });

    const post = await Post.create({ author: req.user.id, username: req.user.username, text, image });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const username = req.user.username;
    const alreadyLiked = post.likes.includes(username);
    post.likes = alreadyLiked ? post.likes.filter((u) => u !== username) : [...post.likes, username];

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ username: req.user.username, text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};