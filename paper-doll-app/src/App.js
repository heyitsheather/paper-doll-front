
import React, { Component } from 'react';
import { Switch, Link,  Route, Redirect} from "react-router-dom";
import axios from "axios";
import './App.css';
import {Navbar, NavItem} from "react-materialize";
import FeedPage from "./components/FeedPage.js"
import NotFound from "./components/NotFound.js";
import UserDashboard from "./components/UserDashboard";
import SignupPage from './components/SignupPage.js';
import LoginPage from "./components/LoginPage.js";
import AddClothing from "./components/AddClothing.js";
import ClothingDetail from "./components/ClothingDetails.js";
import ClothingList from "./components/CothingList.js";
import Profile from "./components/UserProfile.js"
import MyAccount from "./components/MyAccount.js";
import UpdateMeasurements from "./components/UpdateMeasurements.js";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    // React doesn't know at the start if we are logged-in or not
    // (but we can ask the server if we are through an API request)
    axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/checkuser",
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
    .then(response => {
      console.log("Check User", response.data);
      const { userDoc } = response.data;
      this.syncCurrentUser(userDoc);
    })
    .catch(err => {
      console.log("Check User ERROR", err);
      // alert("Sorry! Something went wrong.");
    });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  logoutClick() {
    axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/logout",
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
    .then(() => {
      // make "currentUser" empty again (like it was at the start)
      this.syncCurrentUser(null);
    })
    .catch(err => {
      console.log("Logout ERROR", err);
      // alert("Sorry! Something went wrong.");
    });
  }

  render() {

    
    return (

      <div className="App">

<section>
          {this.state.currentUser ? (
          <Navbar class="navbar">

              <NavItem >
              <Link to="/feed">
              <img class="icon" alt= "add"
                      src= "/images/hanger-line.png"/>
                </Link>
              </NavItem>

              <NavItem>
              <Link to="/add-clothing">
              <img class="icon" alt= "add"
                      src= "/images/plus.png"/>
                </Link>
              </NavItem>

              <NavItem >
              <Link to="/">
                <img class="icon" alt= "account"
                      src= "/images/user.png"/>
                </Link>
              </NavItem>


              <NavItem onClick={() => this.logoutClick()}>
                <Link to="">
              <img class="icon" alt= "logout"
                      src= "/images/logout.png"/> </Link>           
              </NavItem>
              
          </Navbar>



            ) : (
              <span>
                <Redirect to="/login-page" />
              </span>
            )}
        
        </section>
      
       
      
        <Switch>
          <Route exact path="/" component={UserDashboard} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/add-clothing" component={AddClothing} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/clothing-detail" component={ClothingDetail} />
          <Route path="/user-dashboard" component={UserDashboard}/>
          <Route path="/user-profile" component={Profile}/>
          <Route path="/clothing-list" component={ClothingList}/>
          <Route path="/update-measurements" component={UpdateMeasurements}/>
          {/* Use "render" instead of "component" to pass props */}
          <Route path="/signup-page" render={() =>
            <SignupPage currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />
          <Route path="/login-page" render={() =>
            <LoginPage currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          } />

          {/* 404 route LAST */}
          <Route component={NotFound} />
        </Switch>

      </div>

      
    );
  }
}

export default App;