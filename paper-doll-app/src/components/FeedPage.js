import React from "react";
import Gallery from "react-photo-gallery";
import axios from "axios";
import {Redirect} from "react-router-dom";


class SelectingGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectAll: false ,
      // initial array is empty while we are waiting for the API results
      photoArray: null,
    };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }
    componentDidMount() {
      this.getNext6();
    }

    getNext6() {
      axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/photos",
        { withCredentials: true }, // FORCE axios to send cookies across domains
      )
        .then(response => {
          console.log("Photo List", response.data);
  
          const photoArray = response.data.map ((onePhoto)=>{
            return{
              src: onePhoto.url, 
              width: onePhoto.width, 
              height: onePhoto.height,
              _id: onePhoto._id,
            }
          }
            )
          // update our state array with the data from the API
          this.setState({ photoArray: photoArray });
        })
        .catch(err => {
          console.log("Photo List ERROR", err);
        //   alert("Sorry! Something went wrong.");
        });
    }

  
  
  selectPhoto(event, obj) {
    let photos = this.state.photoArray;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photoArray: photos });
    console.log (this.state)
  }

  toggleSelect() {
    let photos = this.state.photoArray.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    this.setState({ photoArray: photos, selectAll: !this.state.selectAll });
  }

  
   

  showGallery() {
    const { photoArray } = this.state;

    if (!photoArray) {
      return (<h1>Loading...</h1>)
    }
    else if (photoArray.length === 0) {
      return (
        <div>
          <Redirect to="/gallery-defeated"/>
          
        </div>
      );
    }
    else {
      return (
        <Gallery
          photos={photoArray}
          onClick={this.selectPhoto}
        
          direction={"row"}
        />
      );
    }
  }

  render() {
    console.log (this.state)
    return (
      <div>
        {/* <p>
          <button className="toggle-select" onClick={this.toggleSelect}>
            toggle select all
          </button>
        </p> */}
        <h1>These might look great on you.</h1>
        

        {this.showGallery()}
        
      </div>
    );
  }
}
export default SelectingGallery;