import axios from "axios";
import React, { useEffect, useState } from "react";
import UserImages from "./UserImages";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://insta.nextacademy.com/api/v1/users"
    })
      .then(response => {
        console.log(response);
        setUsers(response.data);
        // The server responds to us with data
      })
      .catch(error => {
        // handle error here
      });
  }, []);

  return (
    <div id="main">
      {users.map(user => {
        return (
          <div id="profileContainer">
            <div className="profilePhotoName">
              <img
                src={user.profileImage}
                alt="profilePhoto"
                className="profile-Avatar"
              />
              <Link to={"/users/" + user.id}>
                <h3>{user.username}</h3>
              </Link>
            </div>
            <div className="userImages">
              <UserImages userId={user.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
