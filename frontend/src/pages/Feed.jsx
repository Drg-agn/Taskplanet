import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Chip } from '@mui/material';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import api from '../api/axios';

const FILTERS = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Most Liked', value: 'liked' },
  { label: 'Most Commented', value: 'commented' },
];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  const handlePostCreated = (newPost) => setPosts([newPost, ...posts]);

  const handleUpdate = (updatedPost) =>
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));

  const displayedPosts = useMemo(() => {
    const copy = [...posts];
    if (sortBy === 'liked') copy.sort((a, b) => b.likes.length - a.likes.length);
    else if (sortBy === 'commented') copy.sort((a, b) => b.comments.length - a.comments.length);
    else copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return copy;
  }, [posts, sortBy]);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 3, mb: 5 }}>
        <CreatePost onPostCreated={handlePostCreated} />

        <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto', pb: 1 }}>
          {FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              clickable
              onClick={() => setSortBy(f.value)}
              color={sortBy === f.value ? 'primary' : 'default'}
              variant={sortBy === f.value ? 'filled' : 'outlined'}
              sx={{ fontWeight: 500, flexShrink: 0 }}
            />
          ))}
        </Box>

        {displayedPosts.map((post) => (
          <PostCard key={post._id} post={post} onUpdate={handleUpdate} />
        ))}
      </Container>
    </>
  );
};

export default Feed;