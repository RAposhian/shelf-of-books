import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import BookListContainer from '../../StyleComponents/BookListContainer';
import Book from '../Book/Book';
import useInput from '../../Hooks/useInput';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';

const Input = styled.input`
   width: 150px;
   margin: 5px;
   height: 27px;
   border: none;
   text-align: center
`;


const BookDisplay =  props => {
   const [books, setBooks] = useState([]);
   const [{search}, {setInput}] = useInput({search: ''}) 
  
   useEffect(() =>{      
      handleGet()
      
      // eslint-disable-next-line
   }, [])

   const handleAdd = id => {
      axios.post(`/api/collection-book`, {collection_id: props.user.collection_id, book_id: id})
      .then(() => {
         window.alert('Book added to Collection')
      })
      .catch(err => console.log(err))
   }

   const handleGet = async() => {
      await axios.get('/api/books')
      .then(res => {
         if (search) {
            let book = res.data.filter((e, i) => e.name.toLowerCase().includes(search.toLowerCase())) 
            setBooks(book)
         } else {

            setBooks(res.data);
         }
      })
   }
   
   return (
      <BookListContainer style={{minHeight: '100vh'}}>
         <div style={{position: 'fix', top: '55'}}>
            <Input 
               placeholder='Search Title' 
               name='search'
               value={search} 
               onChange={e => setInput(e)} />
            <Button onClick={handleGet}>Submit</Button>   
         </div>   
         {books.map((e, i) => (
         <Book key={i} handleAdd={handleAdd} book={e}/>
      ))}
   </BookListContainer>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);