import React, { useState, useContext } from "react";
import axios from 'axios';
import { store } from "../App";
import { Link } from "react-router-dom";
import contactImage from '../assets/contact_management.jpg'
import Dashboard from "./Dashboard";
import ContactNavbar from "./Navbar";
import {Avatar,Box, Button,CssBaseline, Container,Grid,Typography, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { authAtom } from "../state/atoms";
import { useRecoilState } from 'recoil';

const Login = (props) => {
    const [token, setToken] = useContext(store)
    // const [token, setToken] = useRecoilState(authAtom);

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitForm = e => {
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:8000/login', data).then(
            res => setToken(res.data.token)
        )
    }

    console.log(token);
    if (token) {
        return <Dashboard />;
    }

    return (
        <Box>
            <ContactNavbar />
            <Grid container >
                <Grid xs={8}>
                    <img src={contactImage} alt="React Logo" width='95%' height='70%' />
                </Grid>
                <Grid xs={4}>
                    <Container component="main" maxWidth="xs" >
                        <CssBaseline />

                        <Box
                            sx={{
                                marginTop: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    onChange={onChangeHandler}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    onChange={onChangeHandler}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login;