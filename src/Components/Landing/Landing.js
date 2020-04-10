import React from 'react';
import useInput from '../../Hooks/useInput';
import useAxios from '../../Hooks/useAxios'


const Landing = props => {
   // display a bookshelf picture that asks the visitor what they hope to find in their next book.
   //have a login page here
   
   const [{username, password}, {setInput}] = useInput({
      username: '',
      password: ''
   })

   const [login, {postLogin}] = useAxios('login')
   const [Register, {postRegister}] = useAxios('register')

   return (
      <div>
         <section>
            <h1>Welcome to Shelf of Books</h1>
            <img src='http://clipart-library.com/image_gallery/53417.png' alt='bookShelf'/>
         </section>
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
            <button onClick={() => postLogin({username, password})}>Login</button>
            <button onClick={() =>  postRegister({username, password})} >Register</button>
         </section>
         
      </div>
   )
}

export default Landing;