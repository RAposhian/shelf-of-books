import React, {useEffect, useState} from 'react';
// import useAxios from '../../Hooks/useAxios';
import axios from 'axios';
import {connect} from 'react-redux';

const BookDisplay =  props => {
   // const [books, {getBooks}] = useAxios('books');
   const [books, setBooks] = useState([])
  
  
   useEffect(() =>{
      axios.get('/api/books')
      .then(res => {
         setBooks(res.data);
      })
   }, [])

   const handleAdd = id => {
      axios.post(`/api/collection-book`, {collection_id: props.user.collection_id, book_id: id})
      .then(() => {
         window.alert('Book added to Collection')
      })
      .catch(err => console.log(err))
   }
   
   return (
      <div>
      {books.map((e, i) => (
      <div key={i}>
         <h1>{e.name}</h1>
         <h2>{e.author}</h2>
         <h2>{e.genre}</h2>
         <img src={e.image} alt={e.name}/>
         <button onClick={() => handleAdd(e.book_id)}>Add to Collection</button>
      </div>
      ))}
   </div>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);