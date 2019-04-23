import React, { Component } from "react";
import axios from "axios";
// import Modal from "react-awesome-modal";
import Button from "react-materialize";

class ClothingDetails extends Component {
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
      width: "",
      height:"",
      _id:"",
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
        // alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const {  type, link, brand, price, notes  } = this.state;
    return (
      <div>
      <p>EDIT THIS ITEM</p>

      {/* change this to be a trash can icon */}
      <Button>DELETE THIS ITEM</Button>

<form onSubmit={this.handleSubmit}>
<label>
{/* Type: */}
<input value={this.state.type}
onChange={event => this.handleChange(event)}
type="text" name="type" placeholder={type} />
</label>

<label>
{/* Link to item: */}
<input value={this.state.link}
onChange={event => this.handleChange(event)}
type="text" name="link" placeholder={link} />
</label>

<label> 
{/* Brand: */}
<input value={this.state.brand}
onChange={event => this.handleChange(event)}
type="text" name="brand" placeholder={brand} />
</label>

{/* <label>  */}
{/* Size: */}
{/* <input value={this.state.size}
onChange={event => this.handleChange(event)}
type="text" name="size" placeholder={size} />
</label>  */}

<label>
{/* Price: */}
<input value={this.state.price}
onChange={event => this.handleChange(event)}
type="text" name="price" placeholder={price} />
</label> 

<label>
{/* Notes: */}
<input value={this.state.notes}
onChange={event => this.handleChange(event)}
type="text" name="notes" placeholder={notes} />
</label>

<Button>UPDATE</Button>
</form> 
    
  </div> 
    );
  }
}

export default ClothingDetails;