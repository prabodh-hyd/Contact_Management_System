import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import { AppBar,Button, Toolbar, Typography } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const ContactNavbar = () => {

  return (
    <Box sx={{ padding: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          < PermContactCalendarIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,margin:1 }} >
            Contact Managemet System
          </Typography>
          <Button color="inherit"><Link to="/" variant="body2">Sign In </Link></Button>
          <Button color="inherit"><Link to="/register" variant="body2">Sign Up  </Link></Button>
        </Toolbar>

      </AppBar>
    </Box>
  )
}

export default ContactNavbar;