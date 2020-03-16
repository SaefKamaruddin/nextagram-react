import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/Myprofilepage.css";

function Myprofilepage() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [imageFile, setimageFile] = useState(null);
  const [previewImage, setPreviewImageUrl] = useState("");
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios({
      url: `https://insta.nextacademy.com/api/v1/users/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log(response);
        setUser(response.data);
        // The server responds to us with data
      })
      .catch(error => {
        // handle error here
      });

    axios({
      url: `https://insta.nextacademy.com/api/v1/images/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log(response);
        setImages(response.data);
        // The server responds to us with data
      })
      .catch(error => {
        // handle error here
      });
  }, []);

  const onChange = e => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreviewImageUrl(URL.createObjectURL(e.target.files[0]));
    setimageFile(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", imageFile);

    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/images/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: formData
    })
      .then(response => {
        console.log(response.data);
        window.location.reload(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (token) {
    return (
      <div>
        <h3>{user.username}</h3>
        <img src={user.profile_picture} width="300px" height="300px" />
        <div>
          {images.map(img => {
            console.log(img);
            return <img src={img} width="100px" height="100px" />;
          })}
        </div>
        <div>
          {/* THis part is to select and preview the image */}
          <h1>Your file is {imageFile && imageFile.name}</h1>
          <img
            src={previewImage}
            alt="upload preview"
            height="200px"
            width="200px"
          />
          <form onSubmit={onSubmit}>
            <input type="file" onChange={onChange} />
            {/* THis part is to submit the image */}
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text">
        <h1>You are not logged in</h1>
      </div>
    );
  }
}

export default Myprofilepage;
