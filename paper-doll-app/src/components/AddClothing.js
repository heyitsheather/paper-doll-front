import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddClothing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      link: "",
      brand: "",
      price: "",
      image: "",
      notes: "",
      isSubmitSuccessful: false,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  uploadImage(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // the "FormData" class will format the files for sending to our API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined.
    uploadData.append("fileSubmission", files[0]);

    axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/upload-file",
      uploadData,
      { withCredentials: true }
    )
    .then(response => {
      console.log("Upload Image", response.data);
      this.setState({ image: response.data.fileUrl });
    })
    .catch(err => {
      console.log("Upload Image ERROR", err);
      alert("Sorry! Something went wrong.");
    });
  }

  syncSpecs(event, index) {
    const { specs } = this.state;
    // update the spec value at the given index
    specs[index] = event.target.value;
    // set the state with the updated specs array
    this.setState({ specs });
  }

  handleSubmit(event) {
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/clothing",
      this.state,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Add clothing item", response.data);
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(err => {
        console.log("Add clothing ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      // redirect back to the user dashboard if the form submission worked
      return <Redirect to="/user-dashboard" />;
    }

    return (
      <section className="AddClothing">
        <h2>Add a Clothing Item</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Type:
            <input value={this.state.type}
                onChange={event => this.genericSync(event)}
                type="text" name="type" placeholder="Jeans" />
          </label>

            <label>
            Link to item:
            <input value={this.state.link}
                onChange={event => this.genericSync(event)}
                type="text" name="link" placeholder="www.nordstrom.com/cute-jacket" />
          </label>

          <label>
            Brand:
            <input value={this.state.brand}
                onChange={event => this.genericSync(event)}
                type="text" name="brand" placeholder="Levi" />
          </label>

          <label>
            Price:
            <input value={this.state.price}
                onChange={event => this.genericSync(event)}
                type="text" name="price" placeholder="31" />
          </label>

          <label>
            Notes:
            <input value={this.state.notes}
                onChange={event => this.genericSync(event)}
                type="text" name="notes" placeholder="I like the baggy fit." />
          </label>

         
          <label>
            Image:
            <input type="file" onChange={event => this.uploadImage(event)} />
          </label>
          <img src={this.state.image} />
           
        

          <button>Save This Item</button>
        </form>
      </section>
    );
  }
}

export default AddClothing;