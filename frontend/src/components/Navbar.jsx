import { AppBar, Toolbar, Typography, Avatar, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: '#fff' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Social
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" fontWeight="500">{user.username}</Typography>
            <Avatar sx={{ bgcolor: '#1976d2' }}>{user.username?.[0]?.toUpperCase()}</Avatar>
            <Button variant="outlined" size="small" onClick={handleLogout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;