import React, {Component, Redirect} from "react";
import axios from "axios";
import {Input, Button} from "react-materialize";


class UpdateMeasurements extends Component {
  constructor(props) {
      super(props);

      this.state = { 
            measurementArray:[],
            // chest: "",
            // waist: "",
            // hips: "",
            // inseam: "",
            // isSubmitSuccessful: false,
            
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
       }
   
  componentDidMount() {
  //  this.getMeasurementArray ()}
  // getMeasurementArray() {
  
  // const {params} = this.props.match;
    axios.get(
      process.env.REACT_APP_SERVER_URL + `/api/checkuser`,
      { withCredentials: true }, // FORCE axios to send cookies across domains
      
    )
      .then(response => {
        console.log("Measurement Details", response.data);

        this.setState(response.data);
      
      // const measurementArray =response.data.map ((oneUser)=>{
      //   return{
      //       chest: oneUser.chest,
      //       waist: oneUser.waist,
      //       hips: oneUser.hips,
      //       inseam: oneUser.inseam,

      })

      .catch(err => {
        console.log("Measurement Details ERROR", err);
        
      });
  }

  handleChange(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit=(event)=> {
    
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    console.log("submitting changes!", (this.state) );

    axios.put(
      process.env.REACT_APP_SERVER_URL + `/api/user/` +this.state._id,
      this.state,
      { withCredentials: true },
     // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("updated user measurements", response.data );
        this.setState({isSubmitSuccessful: true});
      })
      .catch(err => {
        console.log("UPDATE user measurements ERROR", err);
       
       });
  }

  render() {


    if (this.state.isSubmitSuccessful) {
      // redirect back to the user dashboard if the form submission worked
      return <Redirect to="/user-dashboard" />
    }

    const {chest, waist, hips, inseam} = this.state;
    return (
      <div>
      <p>UPDATE MEASUREMENTS</p>

<form onSubmit={this.handleSubmit}>
 <label>  
            <h3>CHEST</h3> 
            <p>Measure under your armpits, around your shoulder blades,
 and over the fullest part of your bust. Don’t pull the tape measure too hard.</p>
            <Input value={this.state.chest}
                onChange={event => this.handleChange(event)}
                type="text" name="chest" placeholder={chest} />
          </label>

          <label>
          <h3>WAIST</h3> 
          <p>Measure around your natural waistline. This is the narrow part of your waist, 
about an inch above your navel. Relax and breath out before you measure.</p>

            <Input value={this.state.waist}
                onChange={event => this.handleChange(event)}
                type="text" name="waist" placeholder={waist} />
          </label> 

          <label> 
          <h3>HIP</h3> 
          <p>The hip should be measured around its fullest part (about 8 inch. below your waist).</p>
            <Input value={this.state.hips}
                onChange={event => this.handleChange(event)}
                type="text" name="hips" placeholder={hips} />
          </label>

          <label>
          <h3>INSEAM</h3> 
          <p>This is the measurement from your ankle to your groin, when you stand with your legs straight.
 If possible, ask a friend to help you. This can also be measured on a pair of pants with the proper length.</p>
            <Input value={this.state.inseam}
                onChange={event => this.handleChange(event)}
                type="text" name="inseam" placeholder={inseam} />
          </label> 

<Button>SAVE</Button>
</form> 
    
  </div> 
    );
  }
}

export default UpdateMeasurements;   

// To find your correct size, use a tape measure and take these measurements.
//  Stand with your back straight in front of a mirror, 
//  to make sure that you measure correctly and that the tape measure is kept level.
