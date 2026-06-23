import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 350, borderRadius: 3 }} elevation={2}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>Social</Typography>
        <Typography variant="h6" gutterBottom>Login</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;