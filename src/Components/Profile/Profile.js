import React, { useState } from 'react';
import {connect} from 'react-redux';
import useInput from '../../Hooks/useInput';
import Button from '../../StyleComponents/Button';
import axios from 'axios';
import {userInfo} from '../../redux/userReducer';

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
      <div>
         <img 
            src={props.user.image} 
            alt={props.user.username}
            style={{width: '300px'}} /> 
         {toggle ?
         (
            <>
               <input 
                  name='username' 
                  value={username}
                  placeholder='Username'
                  onChange={e => setInput(e)} />
               <Button onClick={handleSubmit} >Submit</Button>
            </>
         ) :
         (
            <>
               <h1>{props.user.username}</h1>
               <Button onClick={() => setToggle(true)} >Edit Username</Button>
            </>
         )

         }

      </div>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {userInfo})(Profile);