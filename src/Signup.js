import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "./assets/images/camera_logo.png";
import './Nav.css';
import { Grid, TextField } from "@mui/material";
import {auth} from './firebase';

function Signup() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user has logged in...
        setUser(authUser);

      }else {
        //user has logged out
        setUser(null);
      }
    })

    return () => {
      //perform some clean up actions
      unsubscribe();
    }
  }, [user, username]);

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

  const handleSignUp = event => {
    event.preventDefault();
    //create user and capture email & password
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    handleClose();
  }

  return (
    <div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <Button onClick={handleOpen}>Sign Up</Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Grid align='center' >
              <img className="nav__headerImage" style={{width:'45px'}} src={logo} alt="pictogram logo" />
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption">Please fill out the form below to create a pictogram account!</Typography>
            </Grid>
          <form>
            <TextField type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required fullWidth label="First Name" variant="standard" placeholder='Enter your first name' />
            <TextField type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required fullWidth label="Last Name" variant="standard" placeholder='Enter your last name'/>
            <TextField type='text' value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth label='Email' variant='standard' placeholder='Enter your email' />
            <TextField type='text' value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth label="Username" variant="standard" placeholder='Enter a username'/>
            <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth label="Password" variant="standard" placeholder='Password must be a minimum of 8 characters'/>
            <Button onClick={handleSignUp} style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">Sign Up</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Signup;
