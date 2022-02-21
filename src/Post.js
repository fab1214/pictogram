import React from "react";
import Avatar from "@mui/material/Avatar";
import avatar from "./assets/images/louie.jpg";
import "./Post.css";

function Post({ username, caption, imageUrl }) {
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
    </div>
  );
}

export default Post;
