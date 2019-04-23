import React, { Component } from "react";
import axios from "axios";
import { Redirect, } from "react-router-dom";
import {Input, Button} from "react-materialize";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      fullName:"",
      email: "",
    //   avatar: "",
    //   encryptedPassword:"",
      chest:"",
      waist: "",
      hips: "",
      inseam: "",
  
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){ this.getUserDetails ()}
  getUserDetails() {
   
      axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/userdetails",
        { withCredentials: true }, // FORCE axios to send cookies across domains
      )
        .then(response => {
          console.log("User Details", response.data);

          const userDetails =response.data.map ((oneUser)=>{
            return{
            //   src: oneUser.image,
            //   width: oneUser.width,
            //   height: oneUser.height,
            //   avatar: oneUser.avatar,
            fullName:oneUser.fullName,
            email: oneUser.email,
            chest: oneUser.itemChest,
            waist: oneUser.itemWaist,
            hips: oneUser.itemHips,
            inseam: oneUser.itemInseam,
            }
          })



          //update state array with the data from the api
          this.setState({userDetails: userDetails});
        })
        
        .catch(err => {
          console.log("User Details ERROR", err);
          // alert("Sorry! Something went wrong.");
        });

  }

//   genericSync(event) {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

  handleChange(event) {
    let { name, value } = event.target;
    const form = this.state.editFormItem;
    form[name]=value;
    this.setState({ editFormItem: form });
  }

  // // upload avatar
//   uploadImage(event) {
//     const { files } = event.target;
//     console.log("File SELECTED", files[0]);

//     // the "FormData" class will format the files for sending to our API
//     const uploadData = new FormData();
//     // the name "fileSubmission" is the one your backend route defined.
//     uploadData.append("fileSubmission", files[0]);

//     axios.post(
//       process.env.REACT_APP_SERVER_URL + "/api/upload-file",
//       uploadData,
//       { withCredentials: true }
//     )
//     .then(response => {
//       console.log("Upload Image", response.data);
//       this.setState({ image: response.data.fileUrl, width: response.data.width, height: response.data.height });
//     })
//     .catch(err => {
//       console.log("Upload Image ERROR", err);
//       alert("Sorry! Something went wrong.");
//     });
//   }

handleSubmit=(event)=> {
      
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    console.log("submitting changes!", (this.state) );
    axios.put(
      process.env.REACT_APP_SERVER_URL + "/api/user/" + this.state._id,
      this.state.editFormItem,
      { withCredentials: true },
     // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("updated clothing item", response.data );
        this.closeModal ();
        this.getClothingArray ();
      })
      .catch(err => {
        console.log("UPDATE clothing ERROR", err);
        // alert("Sorry! Something went wrong.");
       });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      // redirect back to the user dashboard if the form submission worked
      return <Redirect to="/my-account" />;
    }

    return (
      <section className="MyAccount">
   
               
  
        <h2>EDIT YOUR ACCOUNT DETAILS</h2>
       
       v
          <form onSubmit={this.handleSubmit}>
          <label>
            {/* Full Name */}
            <Input value={this.state.fullName}
                onChange={event => this.handleChange(event)}
                type="text" name="fullName" placeholder={this.state.fullName} />
          </label>

            <label>
            {/* Email */}
           <Input value={this.state.email}
                onChange={event => this.handleChange(event)}
                type="text" name="email" placeholder={this.state.email} />
          </label>

          <label> 
            {/* Chest */}
            <Input value={this.state.chest}
                onChange={event => this.handleChange(event)}
                type="text" name="chest" placeholder={this.state.chest} />
          </label>

          <label>
            {/* waist */}
            <Input value={this.state.waist}
                onChange={event => this.handleChange(event)}
                type="text" name="waist" placeholder={this.state.waist} />
          </label> 

          <label>
            {/* hips: */}
            <Input value={this.state.hips}
                onChange={event => this.handleChange(event)}
                type="text" name="hips" placeholder={this.state.hips} />
          </label>

          <label>
            {/* inseam */}
            <Input value={this.state.inseam}
                onChange={event => this.handleChange(event)}
                type="text" name="inseam" placeholder={this.state.inseam} />
          </label>

          <Button>UPDATE</Button>
        </form> 

      </section>
    );
  }
}

export default MyAccount;