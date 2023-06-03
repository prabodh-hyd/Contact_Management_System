import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Login from "./Login";
import ContactNavbar from "./Navbar";
import contactImage from '../assets/contact_management.jpg'
import { Avatar, Box, Button, Container, CssBaseline, Grid, Typography, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Register = () => {

  const [registerRes, setRegisterRes] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const onChangeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submitForm = e => {
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:8000/register', data).then(
      res => setRegisterRes(res.status)
    )
  }

  if (registerRes) {
    return <Login />;
  }

  return (
    <Box>
      <ContactNavbar />
      <Grid container >
        <Grid xs={8}>
          <img src={contactImage} alt="React Logo" width='95%' height='70%' />
        </Grid>
        <Grid xs={4}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      onChange={onChangeHandler}
                      autoComplete="given-name"
                      name='name'
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={onChangeHandler}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={onChangeHandler}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={onChangeHandler}
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to='/' variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
    // <>
    //   <div>
    //      <form onSubmit={submitForm}>
    //         <h2>Register</h2>
    //         <input type="text" onChange={onChangeHandler} name='name' placeholder="Enter User Name" /><br/>
    //         <input type="email" onChange={onChangeHandler} name='email' placeholder="Enter User Email" /><br/>
    //         <input type="password" onChange={onChangeHandler} name='password' placeholder="Enter User Password" /><br/>
    //         <input type="password" onChange={onChangeHandler} name='confirmpassword' placeholder="Enter User Confirm Password" /><br/>
    //         <input type="submit" value="Register" />
    //      </form>
    //   </div>
    // </>
  )
}

export default Register;