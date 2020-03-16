import React, { useState } from "react";
import "../Navbar/NavBarSigninModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FormFeedback, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";

function NavBarSignInModal(props) {
  const [signInOpen, changeSignInState] = useState(false);
  const [signUpOpen, changeSignUpState] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [delay, setDelay] = useState(null);
  const { logIn, setLogIn } = props;
  const history = useHistory();

  {
    /**********Post API request to sign in *************/
  }

  const postSignIn = () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: usernameIn,
        password: passwordIn
      },
      config
    })
      .then(response => {
        console.log(response);
        history.push("/users/me");
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });

        localStorage.setItem("token", response.data.auth_token);
        setLogIn(true);
        changeSignInState(false);
        window.location.reload(true);
        setUsernameIn("");
        setPasswordIn("");
      })
      .catch(error => {
        console.error(error.response); // so that we know what went wrong if the request failed
        toast.error("Wrong Username/password.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  {
    /**********Post API request to sign up *************/
  }

  const postSignUp = () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: username,
        email: email,
        password: password
      },
      config
    })
      .then(response => {
        console.log(response);
        changeSignUpState(false);
        setEmail("");
        setUsername("");
        setPassword("");
        toast.success("Signed up successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
      .catch(error => {
        console.error(error.response); // so that we know what went wrong if the request failed
      });
  };

  {
    /**********Get api to check validity of username *************/
  }

  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  {
    /**********Sign in and Sign up form designs *************/
  }

  const signInStyle = {
    display: signInOpen ? "block" : "none",
    height: "40vh",
    width: "30vw",
    backgroundColor: "grey",
    position: "fixed",
    top: 100,
    left: 500,
    color: "white"
  };

  const signUpStyle = {
    display: signUpOpen ? "block" : "none",
    height: "50vh",
    width: "30vw",
    backgroundColor: "white",
    position: "fixed",
    top: 100,
    left: 500,
    color: "Black"
  };

  {
    /*************StateManagement for Sign in and Sign up inputs ******************/
  }

  const signIn = () => {
    changeSignInState(!signInOpen);
    changeSignUpState(false);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLogIn(false);
    history.push("/");

    toast.info("You logged out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const signUp = () => {
    changeSignUpState(!signUpOpen);
    changeSignInState(false);
  };

  const closeModal = () => {
    changeSignUpState(false);
    changeSignInState(false);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangeUsername = e => {
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeUsernameIn = e => {
    setUsernameIn(e.target.value);
  };

  const onChangePasswordIn = e => {
    setPasswordIn(e.target.value);
  };

  {
    /************* Disable buttons whenn any input fields are empty ******************/
  }

  const disableClick = () => {
    if (email === "" || password === "" || username === "") {
      return true;
    } else {
      return false;
    }
  };

  const disableClickIn = () => {
    if (passwordIn === "" || usernameIn === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {logIn ? (
        <button className="signInButton" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className="signInButton" onClick={signIn}>
          Sign In
        </button>
      )}
      <div style={signInStyle} className="signInBox ">
        <button onClick={closeModal}>X</button>
        <input
          className="signInField"
          type="text"
          placeholder=" username"
          value={usernameIn}
          onChange={onChangeUsernameIn}
        ></input>
        <input
          className="signInField"
          type="text"
          placeholder="password"
          value={passwordIn}
          onChange={onChangePasswordIn}
        ></input>
        <button onClick={postSignIn} disabled={disableClickIn()}>
          {" "}
          Sign me in
        </button>
        <h4 onClick={signUp}>Don't have an account? Register now</h4>
      </div>

      <div style={signUpStyle}>
        <h1>Sign Up Now!</h1>
        <button onClick={closeModal}>X</button>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={onChangeEmail}
        ></input>
        <FormGroup>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={onChangeUsername}
            {...getInputProp()}
          ></input>
          {getFormFeedback()}
        </FormGroup>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        ></input>
        <input type="text" placeholder="Confirm password"></input>

        <button onClick={postSignUp} disabled={disableClick()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default NavBarSignInModal;
