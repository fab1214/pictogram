import React, { useState } from "react";
import { TextField, Button } from "@mui/material/";
import firebase from 'firebase';
import { storage, db } from "./firebase";

function ImageUpload({username}) {
  //set useState for image upload fields
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      //   get the file you select
      setImage(event.target.files[0]);
      //   and setImage in state to selected file
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on("state_changed", (snapshot) => {
      //   progress function....
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
        // Error function...
        console.log(error);
        alert('There was an error uploading your image');
    },
    () => {
        // complete function...
        storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
            // post image inside firebase db
            db.collections("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username
            });

            setProgress(0);
            setCaption("");
            setImage(null);
        });
    });
  };
  
  return (
    <div>
      {/* I want to have... */}
      {/* caption input */}
      {/* file picker */}
      {/* progress bar */}
      {/* post button */}
      <progress value={progress} max='100'/>
      <TextField
        type="text"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <TextField type="file" onChange={handleChange} />
      <Button
        onClick={handleUpload}
        style={{ marginTop: "15px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
