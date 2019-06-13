import React, { Component, Redirect } from "react";
import axios from "axios";

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
        <h2>Sign Up</h2>

        <form class="form" onSubmit={event => this.handleSubmit(event)}>
          <label>
            Full Name:
            <input value={this.state.fullName}
                onChange={event => this.genericSync(event)}
                type="text" name="fullName" placeholder="Full Name" />
          </label>

          <label>
            Email:
            <input value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" name="email" placeholder="fashionista@gmail.com" />
          </label>

          <label>
            Password:
            <input value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" name="originalPassword" placeholder="*********" />
          </label>

          <label>
            Chest:
            <input value={this.state.chest}
                onChange={event => this.genericSync(event)}
                type="number" name="chest" placeholder="38.5" />
          </label>

          <label>
            Waist:
            <input value={this.state.waist}
                onChange={event => this.genericSync(event)}
                type="number" name="waist" placeholder="31" />
          </label>

          <label>
            Hip:
            <input value={this.state.hips}
                onChange={event => this.genericSync(event)}
                type="number" name="hips" placeholder="40" />
          </label>

          <label>
            Inseam:
            <input value={this.state.inseam}
                onChange={event => this.genericSync(event)}
                type="number" name="inseam" placeholder="32" />
          </label>


{/* To find your correct size, use a tape measure and take these measurements.
 Stand with your back straight in front of a mirror, 
 to make sure that you measure correctly and that the tape measure is kept level.

1. BUST
Measure under your armpits, around your shoulder blades,
 and over the fullest part of your bust. Don’t pull the tape measure too hard.

2. WAIST
Measure around your natural waistline. This is the narrow part of your waist, 
about an inch above your navel. Relax and breath out before you measure.

3. HIP
The hip should be measured around its fullest part (about 8 inch. below your waist).

4. INSEAM
This is the measurement from your ankle to your groin, when you stand with your legs straight.
 If possible, ask a friend to help you. This can also be measured on a pair of pants with the proper length. */}

          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

export default SignupPage;