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
            isSubmitSuccessful: false,
          
            editFormItem:{
              type: "",
              link: "",
              brand: "",
              price: "",
              image: "",
              notes: "",
              width: "",
              height:"",
             
            }
            
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.openModal = this.openModal.bind(this);
    }
    

    componentDidMount(){ this.getClothingArray ()}
    getClothingArray() {
     
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
                _id: oneClothing._id,
                type: oneClothing.type,
                link: oneClothing.link,
                brand:oneClothing.brand,
                price: oneClothing.price,
                image: oneClothing.image,
                notes: oneClothing.notes,
                itemOwner: oneClothing.itemOwner,
                
              }
            })
  
  
  
            //update state array with the data from the api
            this.setState({clothingArray: clothingArray});
          })
          
          .catch(err => {
            console.log("Clothing List ERROR", err);
          });
  
    }


    handleChange(event) {
      let { name, value } = event.target;
      const form = this.state.editFormItem;
      form[name]=value;
      this.setState({ editFormItem: form });
    }
    

    handleSubmit=(event)=> {
      
      // stop the page refresh
      event.preventDefault();

      // PUT and POST requests receive a 2nd argument: the info to submit
      // (we are submitting the state we've gathered from the form)
      console.log("submitting changes!", (this.state) );
      axios.put(
        process.env.REACT_APP_SERVER_URL + "/api/clothing/" + this.state.editFormItem._id,
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
         });
    }

    handleDelete=(event)=> {
      axios.delete(
        process.env.REACT_APP_SERVER_URL + "/api/clothing/" + this.state.editFormItem._id,
       this.state.editFormItem,
       {withCredentials: true}, 

      )
      .then(response => {
        console.log("deleted clothing item", response.data );
        this.closeModal ();
        this.getClothingArray ();
      })
      .catch(err => {
        console.log("delete clothing ERROR", err);

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
    this.setState({
      editFormItem: {...photos[obj.index]},
      currentImage: obj.index,
      selectedClothingItem: photos[obj.index], 
    });
  
    console.log ("modal was opened", this.state)

}


    render() { 
      
      const {clothingArray}= this.state;

      function columns(containerWidth) {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
      }

      if (this.state.isSubmitSuccessful) {
        // redirect back to the user dashboard if the form submission worked
        return <Redirect to="/user-dashboard" />
      }

        return ( 
          
            <section className= "blah">
              <div class="navigation">
              <Link to="/feed"> <img class="icon" alt= "back"
                      src= "/images/white-back-button.png"/></Link>
                      <b>PROFILE</b>
              <Link to="/my-account"> <img class="icon" alt= "back"
                      src= "/images/settings-white.png"/></Link>
              </div>

                
                <Link to="/add-clothing"><img class="addicon" alt= "add"
                      src= "/images/plus-green.png"/></Link>
                
              <div>
                <Gallery photos={clothingArray} columns={columns} onClick={this.openModal}/>
                </div>

        {this.state.selectedClothingItem&& 
        <Modal visible={this.state.selectedClothingItem}  width="300" height="470" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
          <p>EDIT THIS ITEM</p>
                        
          <img onClick={this.handleDelete} class= "trash" alt= "trash" src= "/images/garbage.png"/>
                    
          <form class="form" onSubmit={this.handleSubmit}>
          <label>
            {/* Type: */}
            <input value={this.state.editFormItem.type}
                onChange={event => this.handleChange(event)}
                type="text" name="type" placeholder={this.state.selectedClothingItem.type} />
          </label>

            <label>
            {/* Link to item: */}
           <input value={this.state.editFormItem.link}
                onChange={event => this.handleChange(event)}
                type="text" name="link" placeholder={this.state.selectedClothingItem.link} />
          </label>

          <label> 
            {/* Brand: */}
            <input value={this.state.editFormItem.brand}
                onChange={event => this.handleChange(event)}
                type="text" name="brand" placeholder={this.state.selectedClothingItem.brand} />
          </label>

          <label>
            {/* Price: */}
            <input value={this.state.editFormItem.price}
                onChange={event => this.handleChange(event)}
                type="text" name="price" placeholder={this.state.selectedClothingItem.price} />
          </label> 

          <label>
            {/* Notes: */}
            <input value={this.state.editFormItem.notes}
                onChange={event => this.handleChange(event)}
                type="text" name="notes" placeholder={this.state.selectedClothingItem.notes} />
          </label>

          <Button>SAVE</Button>
        </form> 
                      
                    </div> 
                </Modal>}

            </section>
            



         );
    }
}
 
export default UserDashboard ;