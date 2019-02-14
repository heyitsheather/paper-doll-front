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
                <h1>Hello, User!</h1>
                <Link to="/feed"><button>Discover a new look.</button></Link>
                <Link to="/add-clothing"><button>Add a clothing item.</button></Link>
                <Gallery photos={userArray}/>
            </section>
            



         );
    }
}
 
export default UserDashboard ;