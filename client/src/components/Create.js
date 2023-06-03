import { Box, Button, Grid, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { store } from "../App";

function Create() {

    const [getAllData, setGetAllData] = useContext(store);
    const [createContact, setCreateContact] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    })
    const [open, setOpen] = React.useState(false);

    const onChangeHandler = (e) => {
        setCreateContact({ ...createContact, [e.target.name]: e.target.value })
    }

    const onSubmitForm = e => {
        e.preventDefault();
        console.log(createContact);
        axios.post('http://localhost:8000/create', createContact).then(
            res => console.log(res.status)
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box container>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Contact
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Fill the contact form
                </DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={onChangeHandler}
                                    autoComplete="given-name"
                                    name='firstname'
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={onChangeHandler}
                                    autoComplete="given-name"
                                    name='lastname'
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone Number"
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    id="address"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid gap={2} item sx={{display:'flex'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClose}
                                >
                                    Create
                                </Button>
                                <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>Close</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

            </Dialog>
        </Box>
    )
}
export default Create;