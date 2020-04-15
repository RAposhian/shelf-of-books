import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';
import Book from '../../StyleComponents/Book';
import BookListContainer from '../../StyleComponents/BookListContainer';

const H2 = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin: 2px;
`;


const Collection = props => {
   //attach redux to get user info and collection id. 
   //map over the list of collection books 
   const [books, setBooks] = useState([]);
   const [ratingInput, setRatingInput] = useState('');
   const [toggle, setToggle] = useState(false)

   useEffect(() => {
      // if(!props.user.username){
      //    return props.history.push('/')
      // }

      handleGet();
       // eslint-disable-next-line
   }, [])
   
   const handleGet = () => {
      axios.get(`/api/collection/${props.user.collection_id}`)
      .then(res => {
         setBooks(res.data)
      })
      .catch(err => console.log(err))

   }

   const handleDelete = id => {
      axios.delete(`/api/collection/${id}`)
      .then(() => {
         handleGet()
      })
      .catch(err => console.log(err))
   }

   const handleSubmit = id => {
      axios.put('/api/rating', {ratingInput, book_id: id, collection_id: props.user.collection_id})
      .then(() => {
         setToggle(false)
         handleGet();
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
         <h2>{e.genre}</h2>
         {(toggle) ?
         (
            <>
               <input 
                  placeholder={e.rating}
                  onChange={e => setRatingInput(e.target.value)}
                  type='number' />
               <Button onClick={() => handleSubmit(e.book_id)}>Submit</Button>
            </>
         )
         :
         (
            <>
               <h2>{e.rating}</h2>
               <Button onClick={() => setToggle(true)}>Edit Rating</Button>
            </>
         )}
         <Button onClick={() => handleDelete(e.book_id)} >Remove from Collection</Button>
      </Book>
      ))}
      </BookListContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Collection);