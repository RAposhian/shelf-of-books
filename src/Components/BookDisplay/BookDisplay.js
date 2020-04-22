import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import BookListContainer from '../../StyleComponents/BookListContainer';
import Book from '../Book/Book';
import useInput from '../../Hooks/useInput';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';

const Input = styled.input`
   width: 200px;
   margin: 5px;
   height: 27px;
   border: none;
   text-align: center
`;

const InputDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 40px;
   width: 300px;
   margin-top: 50px;
   margin-left: 40px;

   @media (min-width: 750px) {
      margin-left: 250px
   }

   @media (min-width: 1300px) {
      margin-left: 800px;
   }
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
      <>
         <InputDiv>
            <div>
               <Input 
                  placeholder='Search Title' 
                  name='search'
                  value={search} 
                  style={{marginTop: '50px'}}
                  onChange={e => setInput(e)} />
               <Button onClick={handleGet}>Submit</Button>   
            </div>
         </InputDiv>   
         <BookListContainer style={{minHeight: '100vh'}}>
            {books.map((e, i) => (
            <Book key={i} handleAdd={handleAdd} book={e}/>
         ))}
         </BookListContainer>
      </>
   )
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(BookDisplay);