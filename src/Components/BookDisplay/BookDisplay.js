import React, {useEffect} from 'react';
import useAxios from '../../Hooks/useAxios';

const BookDisplay =  props => {
   const [books, {getBooks}] = useAxios('books');

  
   useEffect(() =>{
      getBooks()
   })
   
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