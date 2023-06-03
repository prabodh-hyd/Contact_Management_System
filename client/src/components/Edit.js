import { Box, Button, Grid, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { store } from "../App";
import EditIcon from '@mui/icons-material/Edit';

function Edit(props) {

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

    const onSubmitForm = (e, id) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/update/${id}`, createContact).then(
            res => console.log(res.status)
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(props.data);

    return (
        <Box container>
            <Button variant="text" onClick={handleClickOpen}>
            <EditIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Edit the contact form
                </DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    onChange={onChangeHandler}
                                    autoComplete="given-name"
                                    name='firstname'
                                    value={props.data.firstname}                                   
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
                                    value={props.data.lastname}
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    value={props.data.email}
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
                                    value={props.data.phone}
                                    fullWidth
                                    name="phone"
                                    label="Phone Number"
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onChangeHandler}
                                    value={props.data.address}
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
                                    Update
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
export default Edit;