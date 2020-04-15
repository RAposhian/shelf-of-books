import React, {useEffect, useState} from 'react';
// import useAxios from '../../Hooks/useAxios';
import axios from 'axios';
import {connect} from 'react-redux';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import Book from '../../StyleComponents/Book';
import BookListContainer from '../../StyleComponents/BookListContainer';



const H2 = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin: 2px;
`;


const BookDisplay =  props => {
   // const [books, {getBooks}] = useAxios('books');
   const [books, setBooks] = useState([])
  
  
   useEffect(() =>{
      // if(!props.user.username){
      //   return props.history.push('/')
      // }
      axios.get('/api/books')
      .then(res => {
         setBooks(res.data);
      })// eslint-disable-next-line
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
      <Book key={i}>
         <img src={e.image} alt={e.name} style={{width: '150px', height: '220px', alignSelf: 'center'}}/>
         <H2>{e.name}</H2>
         <h2>{e.author}</h2>
         <h2 style={{marginBottom: '10px'}}>{e.genre}</h2>
         
         <Button onClick={() => handleAdd(e.book_id)}>Add to Collection</Button>
      </Book>
      ))}
   </BookListContainer>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);