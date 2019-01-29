import React, {Component} from 'react';
import { Link } from "react-router-dom";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <section>
                <h1>Hello, User!</h1>
                <Link to="/feed"><button>Discover a new look.</button></Link>
                <Link to="/add-clothing"><button>Add a clothing item.</button></Link>
                <p>user's uploaded items go here</p>
            </section>
            



         );
    }
}
 
export default UserDashboard ;