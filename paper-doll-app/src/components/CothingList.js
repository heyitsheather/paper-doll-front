import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getClothingUrl(oneClothing) {
  return `/clothing-details/${oneClothing._id}`;
}

class ClothingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial array is empty while we are waiting for the API results
      clothingArray: [],
    };
  }

  // React will call "componentDidMount()" automatically when ClothingList loads
  componentDidMount() {
    // retrieve the info from the API as soon as the component loads
    axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/clothing",
      { withCredentials: true }, // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("clothing List", response.data);
        // update our state array with the data from the API
        this.setState({ clothingArray: response.data });
      })
      .catch(err => {
        console.log("clothing List ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { clothingArray } = this.state;
    return (
      <section className="ClothingList">
      

        <ul>
          {clothingArray.map(oneClothing => {
            return (
              <li key={oneClothing._id}>
                <h3>
                  <Link to={getClothingUrl(oneClothing)}>
                    {oneClothing.model}
                  </Link>
                </h3>
                <p>by {oneClothing.brand}</p>
                <p>${oneClothing.price}</p>
                <img src={oneClothing.image} alt={oneClothing.model} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ClothingList;