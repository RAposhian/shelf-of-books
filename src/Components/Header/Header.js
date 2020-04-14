import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Links = styled.div`
   background-color: grey;
   height: 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;

`;

const Header = props => {
   //import links and setup logout button
   //possibly making this a drop down menu with links
   //set up conditional rendering to show collection link
   //add conditional rendering for logout button
   return (
      <Links>
         <Link to=''><img src={props.user.image} alt={props.user.username}/></Link>
         <Link to='/bookdisplay' style={{textDecoration: 'none'}}>Books</Link>
         <Link to='/collection' style={{textDecoration: 'none'}}>Collection</Link>
         <Link to='/'><button>Logout</button></Link>
         
      </Links>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Header);