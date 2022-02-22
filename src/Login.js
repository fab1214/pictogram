import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "./assets/images/camera_logo.png";
import './Nav.css';
import { Grid, TextField } from "@mui/material";
import {auth} from './firebase';

function Login() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user has logged in...
        console.log(authUser);
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

  const handleSignIn = event => {
    event.preventDefault();
    //create user and capture email & password
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    
    setUsername('');
    setPassword('');
    handleClose();
  }

  return (
    <div>
      {user ? (
          <div></div>
      ): (
        <Button onClick={handleOpen}>Sign In</Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Grid align='center' >
              <img className="nav__headerImage" style={{width:'45px'}} src={logo} alt="pictogram logo" />
              <h2 style={headerStyle}>Sign In</h2>
              <Typography variant="caption">Enter your credentials below to sign in!</Typography>
            </Grid>
          <form>
            <TextField type='text' value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth label='Email' variant='standard' placeholder='Enter your email' />
            <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth label="Password" variant="standard" placeholder='Password must be a minimum of 8 characters'/>
            <Button onClick={handleSignIn} style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">Sign In</Button>
          </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
