import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Post from "./Post";
import { db } from './firebase';
import './App.css';

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
    //blank conditions (empty array in the below example) means run useEffect when page loads
  }, [])

  return (
    <div className="app">
      {/* NAV */}
      <Nav />
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
