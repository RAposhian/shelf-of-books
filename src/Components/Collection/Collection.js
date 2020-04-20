import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import BookListContainer from '../../StyleComponents/BookListContainer';
import CollectionBook from '../CollectionBook/CollectionBook';



const Collection = props => { 
   const [books, setBooks] = useState([]);

   useEffect(() => {
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


   return (
      <BookListContainer style={{minHeight: '100vh'}}>
         {books.map((e, i) => (
        <CollectionBook key={i} book={e} handleDelete={handleDelete}/>    
   
      ))}
      </BookListContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Collection);