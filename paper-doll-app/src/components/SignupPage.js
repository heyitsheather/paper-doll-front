import React, { Component, Redirect } from "react";
import axios from "axios";
import {Button} from "react-materialize";


class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      originalPassword: "",
      chest: "",
      waist: "",
      hips: "",
      inseam: "",
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(
      process.env.REACT_APP_SERVER_URL+"/api/signup",
      this.state,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Signup Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Signup Page ERROR", err);
        // alert("Sorry! Something went wrong.");
      });
  }

  render() {
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return (
        <section className="SignupPage">
         <Redirect to="/user-dashboard" />
        </section>
      );
    }

    return (
      <section className="App-header">
        {/* <h2>SIGN UP</h2> */}

        <form class="form" onSubmit={event => this.handleSubmit(event)}>
          <label>
            FULL NAME:
            <input value={this.state.fullName}
                onChange={event => this.genericSync(event)}
                type="text" name="fullName" placeholder="Full Name" />
          </label>

          <label>
            EMAIL:
            <input value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" name="email" placeholder="fashionista@gmail.com" />
          </label>

          <label>
            PASSWORD:
            <input value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" name="originalPassword" placeholder="*********" />
          </label>

          <label>
            MEASUREMENTS
            <input value={this.state.chest}
                onChange={event => this.genericSync(event)}
                type="number" name="chest" placeholder="CHEST (cm)" />
          </label>

          <label>
            <input value={this.state.waist}
                onChange={event => this.genericSync(event)}
                type="number" name="waist" placeholder="WAIST (cm)" />
          </label>

          <label>
            <input value={this.state.hips}
                onChange={event => this.genericSync(event)}
                type="number" name="hips" placeholder="HIP (cm)" />
          </label>

          <label>
            <input value={this.state.inseam}
                onChange={event => this.genericSync(event)}
                type="number" name="inseam" placeholder="INSEAM (cm)"/>
          </label>

          <Button>Sign Up</Button>
        </form>
      </section>
    );
  }
}

export default SignupPage;