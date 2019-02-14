import React, { Component } from "react";
import axios from "axios";
// import Modal from "react-awesome-modal";

class ClothingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // we need the initial "specs" array to avoid an error with ".map()"
      visable: false
    };
  }



  // React will call "componentDidMount()" automatically when ClothingDetails loads
  componentDidMount() {
    const { params } = this.props.match;
    // retrieve the info from the API as soon as the component loads
    axios.get(
      process.env.REACT_APP_SERVER_URL + `/api/clothing/${params.clothingId}`,
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Clothing Details", response.data);
        // update our state object with the data from the API
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Clothing Details ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { type, link, brand, price, image, notes, createdAt } = this.state;
    return (
      <section className="ClothingDetails">
       
        <img src={image} alt={notes} />

        <h3>{type}</h3>
        <p>by: {brand}</p>
        <p>find it here:  <i>{link}</i></p>
        <b>${price}</b>

        <p>Added on {createdAt}</p>

      </section>
    );
  }
}

export default ClothingDetails;