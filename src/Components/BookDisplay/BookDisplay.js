import React, {useEffect, useState} from 'react';
// import useAxios from '../../Hooks/useAxios';
import axios from 'axios';

const BookDisplay =  props => {
   // const [books, {getBooks}] = useAxios('books');
   const [books, setBooks] = useState([])
  
   useEffect(() =>{
      axios.get('/api/books')
      .then(res => {
         setBooks(res.data);
      })
      
   }, [])
   
   return (
      <div>
      {books.map((e, i) => (
      <div key={i}>
         <h1>{e.name}</h1>
         <h2>{e.author}</h2>
         <h2>{e.genre}</h2>
         <img src={e.image} alt={e.name}/>
      </div>
      ))}
   </div>
   )
}

export default BookDisplay;