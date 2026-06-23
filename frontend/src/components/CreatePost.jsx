import { useState } from 'react';
import { Paper, TextField, Button, Box, IconButton, Avatar } from '@mui/material';
import { PhotoCameraIcon, CloseIcon } from './Icons';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) return;
    setLoading(true);
    try {
      const res = await api.post('/posts', { text, image });
      onPostCreated(res.data);
      setText('');
      setImage(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }} elevation={1}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#1976d2' }}>{user?.username?.[0]?.toUpperCase()}</Avatar>
        <TextField
          fullWidth multiline minRows={2}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="standard"
        />
      </Box>

      {image && (
        <Box sx={{ position: 'relative', mt: 2, display: 'inline-block' }}>
          <img src={image} alt="preview" style={{ maxHeight: 200, borderRadius: 8 }} />
          <IconButton
            size="small"
            onClick={() => setImage(null)}
            sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#fff' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <IconButton component="label" color="primary">
          <PhotoCameraIcon />
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </IconButton>
        <Button variant="contained" disabled={loading || (!text.trim() && !image)} onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;