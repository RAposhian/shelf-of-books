import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import BookListContainer from '../../StyleComponents/BookListContainer';
import Book from '../Book/Book';


const BookDisplay =  props => {
   const [books, setBooks] = useState([]);

  
  
   useEffect(() =>{      
      axios.get('/api/books')
      .then(res => {
         setBooks(res.data);
      })
      // eslint-disable-next-line
   }, [])

   const handleAdd = id => {
      axios.post(`/api/collection-book`, {collection_id: props.user.collection_id, book_id: id})
      .then(() => {
         window.alert('Book added to Collection')
      })
      .catch(err => console.log(err))
   }

 
   
   return (
      <BookListContainer>
      {books.map((e, i) => (
         <Book key={i} handleAdd={handleAdd} book={e}/>
      ))}
   </BookListContainer>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);