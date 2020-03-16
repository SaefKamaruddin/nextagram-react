import React from "react";
import "../Navbar/NavBar.css";
import { Link } from "react-router-dom";
import NavBarSignInModal from "../Navbar/NavBarSignInModal.js";

function NavBar(props) {
  const { logIn, setLogIn } = props;
  return (
    <div id="navBar">
      <h1>
        <Link to="/">Nextagram</Link>
      </h1>
      <div id="leftNav">
        <h2>
          <Link to="/users/me">My Page</Link>
        </h2>
        <NavBarSignInModal logIn={logIn} setLogIn={setLogIn} />
      </div>
    </div>
  );
}

export default NavBar;
