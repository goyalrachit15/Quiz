import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Quiz App
            </Link>
          </Typography>
          {!user ? (
            <>
              <Button color="inherit">
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" style={{ marginRight: '16px' }}>
                Welcome, {user}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
