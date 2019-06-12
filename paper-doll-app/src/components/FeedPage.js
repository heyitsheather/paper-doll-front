import React, {Redirect} from 'react';
import Gallery from 'react-photo-gallery';
import axios from "axios";
import Modal from 'react-awesome-modal';
// import { Link } from "react-router-dom";
// import Link from "react"


class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial array is empty while we are waiting for the API results
    clothingArray: [],
    selectedClothingItem: null
  };
  
  // this.closeLightbox = this.closeLightbox.bind(this);
  this.openModal = this.openModal.bind(this);
  // this.gotoNext = this.gotoNext.bind(this);
  // this.gotoPrevious = this.gotoPrevious.bind(this);

  }

    componentDidMount() {
     
      axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/matchclothing",
        { withCredentials: true }, // FORCE axios to send cookies across domains
      )
        .then(response => {
          console.log("Clothing List", response.data);

          const clothingArray =response.data.map ((oneClothing)=>{
            return{
              itemOwner: oneClothing.itemOwner,
              size: oneClothing.size,
              src: oneClothing.image,
              width: oneClothing.width,
              height: oneClothing.height,
              key: oneClothing._id,
              fullInfoKey: oneClothing,
            }
          })



          //update state array with the data from the api
          this.setState({clothingArray: clothingArray});
        })
        
        .catch(err => {
          console.log("Clothing List ERROR", err);
          // alert("Sorry! Something went wrong.");
        });

  }

  

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
 

  closeModal(){
    this.setState({
      selectedClothingItem: null
    });
  }

 openNewWindow(){
   window.open()
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

    function columns(containerWidth) {
      let columns = 1;
      if (containerWidth >= 500) columns = 2;
      if (containerWidth >= 900) columns = 3;
      if (containerWidth >= 1500) columns = 4;
      return columns;
    }

    if (this.state.isSubmitSuccessful) {
      // redirect back to the user dashboard if the form submission worked
      return <Redirect to="/feed" />
    }
    
    return(
          
        <section className= "clothingFeed">
          
                 <h1>THESE MIGHT LOOK GREAT ON YOU</h1>

        <div>

        <Gallery photos={clothingArray} columns= {columns} onClick={this.openModal} />
        </div>
        {this.state.selectedClothingItem&& 
        <Modal visible={this.state.selectedClothingItem} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        {/* <img src={this.state.selectedClothingItem.image}/> */}
                        <h2>{this.state.selectedClothingItem.brand} </h2>

                        <h3>{this.state.selectedClothingItem.type}</h3>
                       
                        <p>{this.state.selectedClothingItem.size}</p>
                        <p>{this.state.selectedClothingItem.notes}</p>
                        {/* <p>{this.state.selectedClothingItem.price}</p> */}
                        {/* <p>VIEW MORE FROM THIS CLOSET</p> */}
                        <a href={this.state.selectedClothingItem.link}>FIND IT HERE</a>
                        {/* <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a> */}
                    </div>
                </Modal>}
         
        
    
  </section>
  );
}
    }
 


export default FeedPage;