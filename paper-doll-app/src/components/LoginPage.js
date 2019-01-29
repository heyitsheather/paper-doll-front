import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "../images/hanger-line.png"

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
      <section className="LoginPage">
        <header className="App-header">
        <h1>PAPER DOLLS</h1>
          <img src={logo} className="App-logo" alt="logo" />
          
          <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            
            <input value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" name="email" placeholder="EXAMPLE@PHOTOWARRIOR.COM" />
          </label>

          <label>
           
            <input value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" name="originalPassword" placeholder="PASSWORD" />
          </label>

          <button>Log In</button>
        </form>
          <p>NEW? SIGNUP HERE</p>
         
        </header>
        
       
      </section>
    );
  }
}

export default LoginPage;