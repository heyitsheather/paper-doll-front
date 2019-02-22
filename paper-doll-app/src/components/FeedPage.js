import React from 'react';
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
              fullInfoKey: oneClothing,
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

  

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  // gotoPrevious() {
  //   this.setState({
  //     currentImage: this.state.currentImage - 1,
  //   });
  // }
  // gotoNext() {
  //   this.setState({
  //     currentImage: this.state.currentImage + 1,
  //   });
  // }

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
    
    return(
          
        <section className= "clothingFeed">
          
               <div>



                 <h1>THESE MIGHT LOOK GREAT ON YOU</h1>
                 
        <Gallery photos={clothingArray} onClick={this.openModal} direction={"row"}/>
        {this.state.selectedClothingItem&& <Modal visible={this.state.selectedClothingItem} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        {/* <img src={this.state.selectedClothingItem.image}/> */}
                        <h1>{this.state.selectedClothingItem.brand} {this.state.selectedClothingItem.type}</h1>
                        {/* <Link>{this.state.selectedClothingItem.link}link</Link> */}
                        <p>{this.state.selectedClothingItem.size}</p>
                        <p>{this.state.selectedClothingItem.notes}</p>
                        {/* <p>VIEW MORE FROM THIS CLOSET</p> */}
                        <a href={this.state.selectedClothingItem.link}>FIND IT HERE</a>
                        {/* <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a> */}
                    </div>
                </Modal>}
          </div>
        
    ;
  </section>
  );
}
    }
 


export default FeedPage;