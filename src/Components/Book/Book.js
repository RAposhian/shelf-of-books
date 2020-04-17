import React, {useEffect, useState} from 'react';
import Button from '../../StyleComponents/Button'
import styled from 'styled-components';
import BookStyle from '../../StyleComponents/BookStyle';
import axios from 'axios';
import {Link} from 'react-router-dom';

const H2 = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin: 2px;
`;


const Book = props => {
   const {name, image, author, genre, book_id} = props.book;
   const [rating, setRating] = useState(0);
   useEffect(() => {
      handleRating(book_id)
   })

   const handleRating = id => {
      axios.get(`/api/rating/${id}`)
      .then(res => setRating(res.data[0].round))
      .catch(err => console.log(err));
   }

   return (
      <BookStyle>
         <Link to={``} style={{alignSelf: 'center'}}><img src={image} alt={name} style={{width: '150px', height: '220px'}}/></Link>
         <H2>{name}</H2>
         <h2>{author}</h2>
         <h2 >{genre}</h2>
         <h2 style={{marginBottom: '10px'}}>{rating}</h2>
         <Button onClick={() => props.handleAdd(book_id)}>Add to Collection</Button>
      </BookStyle>   
   )
      
}

export default Book;