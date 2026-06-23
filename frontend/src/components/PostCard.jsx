import { useState } from 'react';
import {
  Paper, Box, Avatar, Typography, IconButton, TextField, Button, Divider, Stack,
} from '@mui/material';
import { FavoriteIcon, FavoriteBorderIcon, ChatBubbleOutlineIcon } from './Icons';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const liked = post.likes.includes(user?.username);

  const handleLike = async () => {
    const res = await api.post(`/posts/${post._id}/like`);
    onUpdate(res.data);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const res = await api.post(`/posts/${post._id}/comment`, { text: commentText });
    onUpdate(res.data);
    setCommentText('');
  };

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }} elevation={1}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#1976d2' }}>{post.username?.[0]?.toUpperCase()}</Avatar>
        <Box>
          <Typography fontWeight="bold">{post.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {post.text && <Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>{post.text}</Typography>}

      {post.image && (
        <Box sx={{ mt: 2 }}>
          <img
            src={post.image}
            alt="post"
            style={{ width: '100%', borderRadius: 8, maxHeight: 400, objectFit: 'cover' }}
          />
        </Box>
      )}

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" spacing={3} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2">{post.likes.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2">{post.comments.length}</Typography>
        </Box>
      </Stack>

      {post.likes.length > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Liked by {post.likes.join(', ')}
        </Typography>
      )}

      {showComments && (
        <Box sx={{ mt: 2 }}>
          {post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="body2">
                <strong>{c.username}</strong> {c.text}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small" fullWidth placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            />
            <Button variant="contained" size="small" onClick={handleComment}>Send</Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostCard;