import React, { Component } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {userInfo} from '../../redux/userReducer';

const Links = styled.div`
   background: linear-gradient(to bottom, #5C656D, #999999);
   height: 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   position: fixed;
   top: 0;
   width: 100vw;
   font-family: 'Notable', sans-serif;
`;


class Header extends Component {
   constructor(props) {
      super(props)
      this.state = {
         user: this.props.user
      }
   }
   //import links and setup logout button
   //possibly making this a drop down menu with links
   //set up conditional rendering to show collection link
   //add conditional rendering for logout button

   componentDidMount = async ()  => {
      await this.getUser();
      if(!this.props.user.username){
         return this.props.history.push('/')
       }
   }

   componentDidUpdate = (prevProps) => {
      if(prevProps.user !== this.props.user) {
         this.setState({user: this.props.user})
      }
   }
   
   getUser = async () => {
      await axios.get(`/api/user`)
      .then(res => this.props.userInfo(res.data))
      .catch(err => console.log(err))
   }


   handleLogout = () => {
      axios.get(`/api/logout`)
      .then(() => {
         this.props.history.push('/')
      })
      .catch(err => console.log(err))
   } 

   render() {
      return (
         <Links>
         {/*change all the links to the history.push */}
         <img src={this.state.user.image} alt={this.state.user.username} style={{width: '30px'}} onClick={()=>this.props.history.push('/profile')} />
         <p onClick={()=>this.props.history.push('/bookdisplay')}>Books</p>
         <p onClick={()=>this.props.history.push('/collection')} >Collection</p>
         <Button onClick={this.handleLogout}>Logout</Button>
      </Links>
   )
   } 
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {userInfo})(withRouter(Header));