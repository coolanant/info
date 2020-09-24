import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import { useHistory, useParams } from "react-router-dom";
const Dashboard = () => {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      history.push("/register");
    }
    // if not logged in send to register
  });
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/register");
  };
  return (
    <div>
      <Nav>
        Dashboard
        <FloatRight>
          <button onClick={logoutUser}>Logout</button>
        </FloatRight>
      </Nav>
      {user}
    </div>
  );
};

export default Dashboard;
const Nav = styled.div`
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
`;

const FloatRight = styled.div`
  float: right;
`;
