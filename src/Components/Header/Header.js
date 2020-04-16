import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
   const handleLogout = () => {
      axios.get(`/api/logout`)
      .then(() => {
         props.history.push('/')
      })
      .catch(err => console.log(err))
   } 

   return (
      <Links>
         <Link to='/profile'><img src={props.user.image} alt={props.user.username} style={{width: '30px'}} /></Link>
         <Link to='/bookdisplay' style={{textDecoration: 'none'}}>Books</Link>
         <Link to='/collection' style={{textDecoration: 'none'}}>Collection</Link>
         <Button onClick={handleLogout}>Logout</Button>
         
      </Links>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(withRouter(Header));