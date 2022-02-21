import React, { useState, useEffect } from "react";
import Post from "./Post";
import "./App.css";
import logo from "./assets/images/camera_logo.png";
import { db } from './firebase';
function App() {
  const [posts, setPosts] = useState([]);

  // useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      //every time a new post is added, this code fires...docs references documents and IS needed
      setPosts(snapshot.docs.map(doc => ({
        //map out doc id and data so component knows not to re-render old posts only new posts via keys
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  return (
    <div className="app">
      {/* HEADER */}
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="pictogram logo" />
        <h3>pictogram</h3>
      </div>

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
    </div>
  );
}

export default App;
