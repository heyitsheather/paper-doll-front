import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import {Button} from "react-materialize";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
            
    axios.post(
      process.env.REACT_APP_SERVER_URL+"/api/login",
      this.state,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Login Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Login Page ERROR", err);
        // alert("Sorry! Something went wrong.");
      });
  }

  render() {
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/user-dashboard" />
    }

    return (
     
        <header className="App-header">
        <div class="loginpage">
        <img class="app-logo" alt= "header"
              src="images/pdlogowhite2.png"/>
          
        <div class="form">
          <form onSubmit={event => this.handleSubmit(event)}>
            
          <label>
            <input label="EMAIL" value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" name="email" placeholder="EXAMPLE@PAPERDOLLS.COM" />
          </label>

          <label>
            <input label="PASSWORD" value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" name="originalPassword" placeholder="PASSWORD" />
          </label>

          <Button>Log In</Button>
        </form>
        <Link class="link" to="/signup-page">NEW? SIGN UP HERE.</Link>
        </div>
        </div>
        </header>
        
    );
  }
}

export default LoginPage;