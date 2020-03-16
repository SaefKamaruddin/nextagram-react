import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import NavBar from "./Components/Navbar/NavBar.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import MyprofilePage from "./pages/Myprofilepage.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [logIn, setLogIn] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <NavBar logIn={logIn} setLogIn={setLogIn} />
      <div className="main">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
        />
        <Switch>
          <Route exact path="/users/me" component={() => <MyprofilePage />} />
          <Route path="/users/:id" component={UserProfilePage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
