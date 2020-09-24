import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Add the Firebase services that you want to use
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDNCPmlEgmTiUStEFLE4GmbEbz6EeCksCU",
  authDomain: "bobble-4c4f2.firebaseapp.com",
  databaseURL: "https://bobble-4c4f2.firebaseio.com",
  projectId: "bobble-4c4f2",
  storageBucket: "bobble-4c4f2.appspot.com",
  messagingSenderId: "319051443631",
  appId: "1:319051443631:web:6b9d57bae6bd26c0ecd35a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Register} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
