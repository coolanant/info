import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import { useHistory, useParams, Link } from "react-router-dom";
import * as firebase from "firebase";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      history.push("/dashboard");
    }
    // if logged in send to dashboard
  });

  // if already logged in send to dashboard
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("user_birthday");
  var Gprovider = new firebase.auth.GoogleAuthProvider();
  const facebookReg = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result);
        console.log(token);
        console.log(user);
        localStorage.setItem("token", token);
        console.log(user.displayName);
        localStorage.setItem("user", user.displayName);
        history.push("/dashboard", user);
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const googleReg = () => {
    firebase
      .auth()
      .signInWithPopup(Gprovider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result);
        console.log(token);
        console.log(user.displayName);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.displayName);
        history.push("/dashboard");
        // ...
      })
      .catch(function (error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        alert(errorMessage);
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };
  const loginUser = async () => {
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    try {
      var res = await axios.post("https://reqres.in/api/login", user);
      localStorage.setItem("token", res.data.token);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert(err.response.data.error);
    }
    // history.push("/login");
  };
  return (
    <div>
      <Nav>
        <Img src={Logo} />
      </Nav>
      <Space />
      <center>
        <Card>
          <Bold>SIGN UP</Bold>
          <Heading>Create Your Account</Heading>
          <Text>Lorem Ipsum is simply dummy text of the</Text>
          <Row>
            <Button onClick={facebookReg}>
              <div className="d-flex flex-row">
                <Icon2 src={Facebook} />
                <ButtonText>Sign In with Facebook</ButtonText>
              </div>
            </Button>
            <Button onClick={googleReg}>
              <div className="d-flex flex-row">
                <Icon src={Google} />
                <ButtonText>Sign In with Google</ButtonText>
              </div>
            </Button>
            <hr />

            <Input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email Address"
            />
            <Input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
            />
            <PrimaryButton onClick={loginUser}>Sign In</PrimaryButton>
            <Text>
              {" "}
              Not Registered? <Link to="/register">SignUp</Link>
            </Text>
          </Row>
        </Card>
      </center>
    </div>
  );
};

export default Login;

const Input = styled.input`
  width: 100%;
  height: 2em;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 15px;
`;

const Nav = styled.div`
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
`;

const Img = styled.img`
  width: 150px;
`;

const Row = styled.div`
  grid: display;
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-rows: 1fr;
  column-gap: 10px;
  row-gap: 25px;
`;

const Button = styled.button`
  background-color: white;
  color: #42413c;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  font-size: 1.2em;
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
`;

const ButtonText = styled.div`
  margin-top: 8px;
`;
export const Card = styled.div`
  padding: 5px 30px 30px 30px;
  background-color: white;
  width: 45%;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 830px) {
    width: 80%;
    right: 35px;
    top: 10%;
    padding: 5px 30px 30px 30px;
    background-color: white;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }
`;

const Space = styled.div`
  margin-top: 30px;
`;

const Bold = styled.h3`
  color: #42413c;
`;

const Heading = styled.div`
  margin-top: 30px;
  color: #42413c;
  font-size: 1.3em;
`;

const Text = styled.span`
  color: #42413c;
`;

const Icon = styled.img`
  width: 30px;
  margin-top: 6px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const Icon2 = styled.img`
  width: 30px;
  margin-top: 6px;
  margin-right: 5px;
  margin-bottom: 5px;
  @media (max-width: 500px) {
    height: 50%;
    margin-top: 15px;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  border: none;
  color: white;
  text-align: center;
  background-color: #47b5db;
`;
