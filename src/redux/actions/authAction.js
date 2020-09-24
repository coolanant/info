import axios from "axios";
import * as firebase from "firebase";

export const loginUserF = (history) => async (dispatch) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("user_birthday");

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
      console.log(user.user.displayName);
      localStorage.setItem("user", user.displayName);
      dispatch({
        type: "LOGIN_USER",
        payload: user,
      });
      history.push("/dashboard");
      // ...
    })
    .catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      dispatch({
        type: "GET_ERRORS",
        payload: "error",
      });
    });
};

export const loginUserG = (history) => async (dispatch) => {
  var Gprovider = new firebase.auth.GoogleAuthProvider();
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
      dispatch({
        type: "LOGIN_USER",
        payload: user,
      });

      history.push("/dashboard");

      // ...
    })
    .catch(function (error) {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
      dispatch({
        type: "GET_ERRORS",
        payload: "error",
      });
    });
};
