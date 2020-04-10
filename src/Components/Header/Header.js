import React from 'react';
import {Link} from 'react-router-dom';


const Header = props => {
   //import links and setup logout button
   //possibly making this a drop down menu with links
   //set up conditional rendering to show collection link
   return (
      <div>
         <Link to='/'><button>Logout</button></Link>
         <Link to='/bookdisplay'>Books</Link>
         
      </div>
   )
}

export default Header;