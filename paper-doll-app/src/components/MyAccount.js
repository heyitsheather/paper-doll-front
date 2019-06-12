import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link} from "react-router-dom";
import { Button} from "react-materialize";
// import Modal from 'react-awesome-modal';




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
      <section class="MyAccount">

      
  
        <h2>MY ACCOUNT</h2>
  
        
          <Button>CHANGE AVATAR</Button>
          <Button>ACCOUNT SETTINGS</Button>
          <Button><Link to="/update-measurements">UPDATE MY MEASUREMENTS</Link></Button>
          {/* <Button onClick={() => this.logoutClick()}>LOGOUT</Button> */}

      </section>
      
    );
  }
}

export default MyAccount;