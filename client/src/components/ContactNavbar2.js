import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AppBar,Button, Toolbar, Typography } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import { store } from '../App';

const ContactNavbar2 = (pros) => {
  const [token, setToken] = useContext(store);

  const handleLogout = () =>{
    // setToken(null)
    const removeAuthKey = localStorage.removeItem('auth_key');
    setToken(removeAuthKey);
  }

  return (
    <Box sx={{ padding: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          < PermContactCalendarIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,margin:1 }} >
            Contact Managemet System
          </Typography>
          <Button color="inherit">{pros.name}</Button>
          <Button color="inherit" onClick={handleLogout} ><LogoutIcon /></Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ContactNavbar2;