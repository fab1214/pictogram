import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "./assets/images/camera_logo.png";
import './Nav.css';
import { Grid, TextField } from "@mui/material";

function Signup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const headerStyle={margin: 0};

  return (
    <div>
    <Button onClick={handleOpen}>Sign Up</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Grid align='center' >
              <img className="nav__headerImage" src={logo} alt="pictogram logo" />
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption">Please fill out the form below to create a pictogram account!</Typography>
            </Grid>
          <form>
            <TextField required fullWidth label="First Name" variant="standard" placeholder='Enter your first name'/>
            <TextField required fullWidth label="Last Name" variant="standard" placeholder='Enter your last name'/>
            <TextField required fullWidth label="Email" variant="standard" placeholder='Enter your email'/>
            <TextField required fullWidth label="Username" variant="standard" placeholder='Enter a username'/>
            <TextField required type='password' fullWidth label="Password" variant="standard" placeholder='Password must be a minimum of 8 characters'/>
            <Button style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">Sign Up</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Signup;
