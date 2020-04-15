import React from 'react';
import useInput from '../../Hooks/useInput';
// import useAxios from '../../Hooks/useAxios';
import {userInfo} from '../../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button'


const Background = styled.div`
   height: 81.5vh;
   width: 100wv;
   padding-left: 35px;
   padding-top: 150px;
`;

const LandingContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border: 1px solid black;
   border-radius: 15px;
   width: 300px;
   height: 400px;   
   box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.75);
`;

const InputContainer = styled.section`
   display: flex;
   flex-direction: column;
   margin: 1px;
   max-width: auto;
   margin-bottom: 10px;
   ${'' /* border: 2px solid black;
   border-radius: 15px; */}
   padding: 15px;
`;

const Input = styled.input`
   width: 150px;
   margin: 5px;
   height: 20px;
   border: none;
   text-align: center
`;

const H1 = styled.h1`
   align-self: center;
   margin-bottom: 20px;
   font-size: 20px;
   font-weight: bold;
   font-family: 'Notable', sans-serif;
`;

const Landing = props => {
   
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
      <Background>
         <LandingContainer>
            <H1>Shelf of Books</H1>
            <img src='https://res.cloudinary.com/desyiuzzn/image/upload/v1586799305/refternu/xhdydkaq9ic5r1gg3iix.png' alt='bookShelf' style={{width: '165px'}}/>
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
               <div style={{margin: '3px', display: 'flex', justifyContent: 'space-around'}}>
                  <Button 
                     onClick={handleLogin}>Login</Button>
                  <Button 
                     onClick={handleRegister} >Register</Button>
               </div>
            </InputContainer>   
         </LandingContainer>
      </Background>   
   )
}

export default connect(null, {userInfo})(Landing);