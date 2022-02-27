import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import avatar from "./assets/images/louie.jpg";
import firebase from 'firebase';
import { db } from './firebase';
import "./Post.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";


function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId){
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>{
        setComments(snapshot.docs.map((doc) => doc.data()))
      });
    }

    return () => {
      unsubscribe();
    };

  }, [postId]);

  const submitComment = event => {
    event.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: user.displayName
    });
    setComment('');
  };
  
  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="add in src later"
          sx={{ width: 50, height: 50 }}
        />
        <h3>{username}</h3>
      </div>
      {/* image */}
      <img className="post__image" src={imageUrl} alt=""/>
      {/* username + caption */}
      <h4 className="post__text">
        <b>{username}</b> {caption}
      </h4>
    <div className="post__comments">
    {comments.map((comment) => (
     <p> <b>{comment.username}</b> {comment.text}
     </p>
    ))}
    </div>
    {user ? (
    <form>
      <TextField type="text" value={comment} onChange={(e) => setComment(e.target.value)} variant='standard' placeholder="Add a comment..." />
      <Button onClick={submitComment} type="submit" disabled={!comment} variant="contained" color="primary">Post</Button>
    </form>
    ): (
    <div></div>
    )}
    </div>
  );
}

export default Post;
