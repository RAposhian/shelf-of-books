import React, { useState } from 'react';
import {connect} from 'react-redux';
import useInput from '../../Hooks/useInput';
import Button from '../../StyleComponents/Button';
import axios from 'axios';
import {userInfo} from '../../redux/userReducer';
import styled from 'styled-components';

const ProfileContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   min-height: 100vh;
   margin-top: 50px;
   padding-bottom: 100px
`; 

const H2 = styled.h2`
   font-size: 30px;
   font-weight: bold;
   margin: 2px;
`;

const UsernameContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   text-align: center;
   border: 2px solid black;
   border-radius: 15px;
   width: 350px;
   height: 600px;
   box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.75);
`;

const Profile = props => {
   const [toggle, setToggle] = useState(false);
   const [{username}, {setInput}] = useInput({
      username: ''
   })
   
   const handleSubmit = () => {
      if(!username) {
         return window.alert('Username cannot be blank');
      }
      axios.get(`/api/username/?username=${username}`)
      .then(res => {
         if (res.data) {
            axios.post(`/api/username`, {username: props.user.username, newUsername: username})
            .then(response => {
               console.log(response.data)
               props.userInfo(response.data)
               setToggle(false)
            })
         }
      })
   }

   return (
      <ProfileContainer>
         <UsernameContainer>
         <img 
            src={props.user.image} 
            alt={props.user.username}
            style={{width: '300px', border: '2px solid black'}} />
         
         {toggle ?
         (
            <div>
               <input 
                  name='username' 
                  value={username}
                  placeholder='Username'
                  onChange={e => setInput(e)} />
               <Button onClick={handleSubmit} >Submit</Button>
            </div>
         ) :
         (
            <div>
               <H2>{props.user.username}</H2>
               <Button onClick={() => setToggle(true)} >Edit Username</Button>
            </div>
         )

         }
         </UsernameContainer>

      </ProfileContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {userInfo})(Profile);