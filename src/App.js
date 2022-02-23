import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { db } from './firebase';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import logo from "./assets/images/camera_logo.png";
import './Nav.css';
import { Grid, TextField } from "@mui/material";
import {auth} from './firebase';


function App() {
  const [posts, setPosts] = useState([]);

  // useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    //this is where the code runs
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //every time a new post is added, this code fires...docs references documents and IS needed
      setPosts(snapshot.docs.map(doc => ({
        //map out doc id and data so component knows not to re-render old posts only new posts via keys
        id: doc.id,
        post: doc.data()
      })));
    })
    //blank conditions (empty array in the below example) means run useEffect when page loads
  }, [])


//modals
// sign up
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);

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

  const openSignUp = () => setOpen(true);
  const closeSignUp = () => setOpen(false);
  const handleOpen = () => setOpenSignIn(true);
  const handleClose = () => setOpenSignIn(false);

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
        displayName: username,
      })
    })
    .catch((error) => alert(error.message));

    closeSignUp();
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");

  }

  //sign in

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

  const handleSignIn = event => {
    event.preventDefault();
    //create user and capture email & password
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    
    handleClose();
    setUsername("");
    setPassword("");
  }


  return (
    <div className="app">
      {/* NAV */}
      <Nav />
      {/* MODALS */}

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <Button onClick={openSignUp}>Sign Up</Button>
      )}
      <Modal open={open} onClose={closeSignUp}>
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

      {user ? (
          <div></div>
      ): (
        <Button onClick={handleOpen}>Sign In</Button>
      )}
      <Modal open={openSignIn} onClose={handleClose}>
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

      <h1>Building pictogram, an instagram clone!</h1>

      {/* POSTS */}
      {
        posts.map(({id, post}) => (
        <Post
        key={id}
        username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}
        />
      ))}

      {/* I want to have... */}
      {/* caption input */}
      {/* file picker */}
      {/* post button */}
      {user ? (
      <ImageUpload username={user.displayName} />
      ): (
      <div></div>
      )}

    </div>
  );
}

export default App;
