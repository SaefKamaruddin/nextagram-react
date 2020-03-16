import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/Userimages.css";

const UserImages = props => {
  const { userId } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://insta.nextacademy.com/api/v1/images?userId=${userId}`
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

  return (
    <div className="userImg">
      {images.splice(0, 6).map(img => {
        return <img src={img} />;
      })}
    </div>
  );
};

export default UserImages;
