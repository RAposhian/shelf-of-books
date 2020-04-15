import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';

const Links = styled.div`
   background: linear-gradient(to bottom, #5C656D, #999999);
   height: 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   position: fixed;
   top: 0;
   width: 100vw;
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
         <Link to='/'><Button>Logout</Button></Link>
         
      </Links>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Header);