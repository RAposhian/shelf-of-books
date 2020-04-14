import React from 'react';
import useInput from '../../Hooks/useInput';
// import useAxios from '../../Hooks/useAxios';
import {userInfo} from '../../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button'

const LandingContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
`;

const InputContainer = styled.section`
   display: flex;
   margin: 10px;
   max-width: auto;
   margin-bottom: 70px;
`;

const Input = styled.input`
   width: 100px;
   margin: 5px;
`;

const Landing = props => {
   // display a bookshelf picture that asks the visitor what they hope to find in their next book.
   //have a login page here
   
   const [{username, password}, {setInput}] = useInput({
      username: '',
      password: ''
   })

   // const [login, {postLogin}] = useAxios('login');
   // const [register, {postRegister}] = useAxios('register');

   const handleRegister = () => {
      axios.post('/api/register', {username, password})
      .then(res => {
         props.userInfo(res.data)
         props.history.push('/bookdisplay')
      })
      .catch(err => console.log(err))
   }

   const handleLogin = () => {
      axios.post('/api/login', {username, password})
      .then(res => {
         props.userInfo(res.data)
         props.history.push('/bookdisplay')
      })
      .catch(err => console.log(err))
   }


   return (
      <LandingContainer>
         <InputContainer>
            <Input 
               name='username' 
               value={username} 
               placeholder='Username' 
               onChange={e => setInput(e)}/>
            <Input 
               name='password' 
               value={password} 
               placeholder='Password' 
               type='password' 
               onChange={e => setInput(e)}/>
            <div style={{margin: '2px'}}>
               <Button 
                  onClick={handleLogin}>Login</Button>
               <Button 
                  onClick={handleRegister} >Register</Button>
            </div>
         </InputContainer>
         <section>
            <h1>Welcome to Shelf of Books</h1>
            <img src='https://res.cloudinary.com/desyiuzzn/image/upload/v1586799305/refternu/xhdydkaq9ic5r1gg3iix.png' alt='bookShelf'/>
         </section>
         
      </LandingContainer>
   )
}

export default connect(null, {userInfo})(Landing);