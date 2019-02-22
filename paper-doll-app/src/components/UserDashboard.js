import React, {Redirect} from 'react';
import { Link } from "react-router-dom";
import Gallery from "react-photo-gallery";
import axios from "axios";
import Modal from "react-awesome-modal";
import {Button} from "react-materialize";


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            clothingArray: [],
            selectedClothingItem: null,
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
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);

         this.openModal = this.openModal.bind(this);
    }
    


    componentDidMount() {
     
        axios.get(
          process.env.REACT_APP_SERVER_URL + "/api/clothing",
          { withCredentials: true }, // FORCE axios to send cookies across domains
        )
          .then(response => {
            console.log("Clothing List", response.data);
  
            const clothingArray =response.data.map ((oneClothing)=>{
              return{
                src: oneClothing.image,
                width: oneClothing.width,
                height: oneClothing.height,
                key: oneClothing._id,
                id: oneClothing._id,
                fullInfoKey: oneClothing,
                // type:
                // link:
                // brand:
                // price:
                // image:
                // notes:
              

              }
            })
  
  
  
            //update state array with the data from the api
            this.setState({clothingArray: clothingArray});
          })
          
          .catch(err => {
            console.log("Clothing List ERROR", err);
            alert("Sorry! Something went wrong.");
          });
  
    }


    handleChange(event) {
      let { name, value } = event.target;
      this.setState({ [name]: value });
    }
    

    handleSubmit=(event)=> {
      // stop the page refresh
      event.preventDefault();
      
      // PUT and POST requests receive a 2nd argument: the info to submit
      // (we are submitting the state we've gathered from the form)
      axios.put(
        process.env.REACT_APP_SERVER_URL + "/api/clothing",
        this.state,
        { withCredentials: true },
         // FORCE axios to send cookies across domains
      )
        .then(response => {
          console.log("updated clothing item", this.state);
          this.setState({ isSubmitSuccessful: true });
        })
        .catch(err => {
          console.log("UPDATE clothing ERROR", err);
          alert("Sorry! Something went wrong.");
        });
    }


    closeModal(){
      this.setState({
        selectedClothingItem: null
      });
    }
    
openModal(event, obj) {
  let photos = this.state.clothingArray;
  photos[obj.index].selected = !photos[obj.index].selected;
    console.log ("photosobj.index",photos[obj.index],obj)
    this.setState({
      currentImage: obj.index,
      selectedClothingItem: photos[obj.index].fullInfoKey
    });
}

    render() { 
      const {clothingArray}= this.state;

      // if (this.state.isSubmitSuccessful) {
      //   // redirect back to the user dashboard if the form submission worked
      //   return <Redirect to="/user-dashboard" />
      // }

        return ( 
            <section>
              
                <h1>WELCOME TO YOUR CLOSET</h1>

                <Gallery photos={clothingArray} onClick={this.openModal} direction={"row"}/>
        {this.state.selectedClothingItem&& 
        <Modal visible={this.state.selectedClothingItem}  width="400" height="470" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <p>EDIT THIS ITEM</p>

                        {/* change this to be a trash can icon */}
                        <Button>DELETE THIS ITEM</Button>

          <form onSubmit={this.handleSubmit}>
          <label>
            {/* Type: */}
            <input value={this.state.type}
                onChange={event => this.handleChange(event)}
                type="text" name="type" placeholder={this.state.selectedClothingItem.type} />
          </label>

            <label>
            {/* Link to item: */}
           <input value={this.state.link}
                onChange={event => this.handleChange(event)}
                type="text" name="link" placeholder={this.state.selectedClothingItem.link} />
          </label>

          <label> 
            {/* Brand: */}
            <input value={this.state.brand}
                onChange={event => this.handleChange(event)}
                type="text" name="brand" placeholder={this.state.selectedClothingItem.brand} />
          </label>

          {/* <label>  */}
            {/* Size: */}
            {/* <input value={this.state.size}
                onChange={event => this.handleChange(event)}
                type="text" name="size" placeholder={this.state.selectedClothingItem.size} />
          </label>  */}

          <label>
            {/* Price: */}
            <input value={this.state.price}
                onChange={event => this.handleChange(event)}
                type="text" name="price" placeholder={this.state.selectedClothingItem.price} />
          </label> 

          <label>
            {/* Notes: */}
            <input value={this.state.notes}
                onChange={event => this.handleChange(event)}
                type="text" name="notes" placeholder={this.state.selectedClothingItem.notes} />
          </label>

          <Button>UPDATE</Button>
        </form> 
                      
                    </div> 
                </Modal>}

            </section>
            



         );
    }
}
 
export default UserDashboard ;