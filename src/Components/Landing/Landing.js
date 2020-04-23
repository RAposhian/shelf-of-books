import React from 'react';
import useInput from '../../Hooks/useInput';
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

   @media (min-width:750px) {
      height: 75vh;
      padding-left: 200px;
      padding-top: 260px;
   }

   @media (min-width: 1300px) {
      height: 80vh;
      padding-left: 700px;
      padding-top: 200px;
        
   }
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

   @media (min-width:750px) {
      width: 350px;
      height: 450px;
   }

   @media (min-width: 1300px) {
      width: 500px;
      height: 600px  
   }
`;

const InputContainer = styled.section`
   display: flex;
   flex-direction: column;
   margin: 1px;
   max-width: auto;
   margin-bottom: 10px;
   padding: 15px;
`;

const Input = styled.input`
   width: 150px;
   margin: 5px;
   height: 20px;
   border: none;
   text-align: center;

   @media (min-width: 750px) {
      width: 200px;
      height: 25px
   }
`;

const H1 = styled.h1`
   align-self: center;
   margin-bottom: 20px;
   font-size: 20px;
   font-weight: bold;
   font-family: 'Notable', sans-serif;
   letter-spacing: 2px;

   @media (min-width: 750px) {
      font-size: 22px
   }

   @media (min-width: 1300px) {
      font-size: 30px
   }
`;

const Image = styled.img`
   width: 165px;

   @media (min-width: 750px) {
      width: 200px
   }

   @media (min-width: 1300px) {
      
   }
`;

const Landing = props => {
   
   const [{username, password}, {setInput}] = useInput({
      username: '',
      password: ''
   })


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
      .then(async (res) => {
        await  props.userInfo(res.data)
         props.history.push('/bookdisplay')
      })
      .catch(err => console.log(err))
   }


   return (
      <Background>
         <LandingContainer>
            <H1>Shelf of Books</H1>
            <Image src={process.env.REACT_APP_BOOKSHELF_STRING} alt='bookShelf'/>
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