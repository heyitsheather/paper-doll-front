import React, { Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
// import {Input, Button} from "react-materialize";


class HowToMeasure extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            itemOwner: "",
         }
    }
    render() { 
        return ( 

            
            <div className ="info">

            <Link to="/update-measurements"><img class="icon" alt= "back"
                      src= "/images/backarrow.png"/></Link>

            <h3>CHEST</h3>
            <p>Measure under your armpits, around your shoulder blades,
            and over the fullest part of your bust. Don’t pull the tape 
            measure too hard.</p> 

            <h3>WAIST</h3>
            <p>Measure around your natural waistline. This is the 
            narrow part of your waist, 
            about an inch above your navel. Relax and breath out before
            you measure.</p>

            <h3>HIP</h3>
            <p>The hip should be measured around its fullest part 
            (about 8 inch. below your waist).</p>

            <h3>INSEAM</h3>
            <p>This is the measurement from your ankle to your groin,
             when you stand with your legs straight. If possible, ask a 
             friend to help you. This can also be measured on a pair of 
             pants with the proper length.</p>
            </div>

         );
    }
}
 
export default HowToMeasure;