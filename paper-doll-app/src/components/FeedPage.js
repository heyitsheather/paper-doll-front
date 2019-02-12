import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import axios from "axios";


// function getClothingUrl(oneClothing) {
//   return `/clothing-details/${oneClothing._id}`;
// }



class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial array is empty while we are waiting for the API results
    clothingArray: [],
  };
  
  this.closeLightbox = this.closeLightbox.bind(this);
  this.openLightbox = this.openLightbox.bind(this);
  this.gotoNext = this.gotoNext.bind(this);
  this.gotoPrevious = this.gotoPrevious.bind(this);

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
              src: oneClothing.image
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

  
  openLightbox(event, obj) {
    let photos = this.state.clothingArray;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,});
      console.log (this.state)
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const {clothingArray}= this.state;
    return(
          
        <section className= "clothingFeed">
           {clothingArray.map(oneClothing => {
             return(
               <div>
        <Gallery photos={clothingArray} onClick={this.openLightbox} />
        <Lightbox images={clothingArray}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}/>
          </div>
        
    );
  })}
  </section>
  );
}
    }
 


export default FeedPage;