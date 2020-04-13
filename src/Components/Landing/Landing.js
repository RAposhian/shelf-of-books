import React from 'react';
import useInput from '../../Hooks/useInput';
// import useAxios from '../../Hooks/useAxios';
import {userInfo} from '../../redux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';


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
      <div>
         <section>
            <input 
               name='username' 
               value={username} 
               placeholder='Username' 
               onChange={e => setInput(e)}/>
            <input 
               name='password' 
               value={password} 
               placeholder='Password' 
               type='password' 
               onChange={e => setInput(e)}/>
            <button 
               onClick={handleLogin}>Login</button>
            <button 
               onClick={handleRegister} >Register</button>
         </section>
         <section>
            <h1>Welcome to Shelf of Books</h1>
            <img src='https://res.cloudinary.com/desyiuzzn/image/upload/v1586799305/refternu/xhdydkaq9ic5r1gg3iix.png' alt='bookShelf'/>
         </section>
         
      </div>
   )
}

export default connect(null, {userInfo})(Landing);