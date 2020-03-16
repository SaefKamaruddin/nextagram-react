import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Components/UserProfilePage.css";

const UserProfilePage = props => {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
      .then(response => {
        setImages(response.data);
      });
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/${id}`)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      });
  }, []);

  return (
    <div id="profilePageContainermain">
      <h3>{user.username}</h3>
      <img src={user.profileImage} width="300px" height="300px" />
      <div>
        {images.map(img => {
          console.log(img);
          return <img src={img} width="100px" height="100px" />;
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;
