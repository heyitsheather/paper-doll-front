import React, { Component } from "react";
// import axios from "axios";
// import { Redirect, Link } from "react-router-dom";
// import logo from "../images/hanger-line.png"
// import {Button} from "react-materialize";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
    };
  }

  
  render() {
    

    return (
      <section className="LoginPage">
        <header className="App-header">
        
        <img class="app-logo" alt= "header"
              src="images/pdlogowhite2.png"/>
          
         <h2>DISCOVER & ENJOY</h2>
         <h3>skipping the dressing room</h3>
         
        </header>
        
       
      </section>
    );
  }
}

export default LandingPage;