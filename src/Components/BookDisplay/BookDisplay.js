import React, {useEffect, useState} from 'react';
// import useAxios from '../../Hooks/useAxios';
import axios from 'axios';
import {connect} from 'react-redux';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';

const BookListContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   margin-top: 50px;
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
      <div key={i}>
         <h1>{e.name}</h1>
         <h2>{e.author}</h2>
         <h2>{e.genre}</h2>
         <img src={e.image} alt={e.name} style={{width: '150px', height: '220px'}}/>
         <Button onClick={() => handleAdd(e.book_id)}>Add to Collection</Button>
      </div>
      ))}
   </BookListContainer>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);