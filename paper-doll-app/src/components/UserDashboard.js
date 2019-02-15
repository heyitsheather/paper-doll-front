import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Gallery from "react-photo-gallery";
import axios from "axios";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userArray: []
         }
    }

    componentDidMount() {
     
        axios.get(
          process.env.REACT_APP_SERVER_URL + "/api/clothing",
          { withCredentials: true }, // FORCE axios to send cookies across domains
        )
          .then(response => {
            console.log("Clothing List", response.data);
  
            const userArray =response.data.map ((oneClothing)=>{
              return{
                src: oneClothing.image
              }
            })
  
  
  
            //update state array with the data from the api
            this.setState({userArray: userArray});
          })
          
          .catch(err => {
            console.log("Clothing List ERROR", err);
            alert("Sorry! Something went wrong.");
          });
  
    }
    render() { 
        const {userArray}= this.state;
        return ( 
            <section>
               
                <Link to="/feed"><button>DISCOVER A NEW LOOK</button></Link>
                <Link to="/add-clothing"><button>ADD A NEW ITEM</button></Link>
                <h1>WELCOME TO YOUR CLOSET</h1>
                <Gallery photos={userArray}/>
            </section>
            



         );
    }
}
 
export default UserDashboard ;