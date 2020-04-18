import React from 'react';
import Button from '../../StyleComponents/Button'
import styled from 'styled-components';
import BookStyle from '../../StyleComponents/BookStyle';
import {Link} from 'react-router-dom';
import {GoStar} from 'react-icons/go'

const H2 = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin: 2px;
`;

const CollectionBook = props => {
   const {name, author, rating, image, book_id, genre} = props.book;

  
   const stars = []
   for (let i = 0; i < rating; i++) {
      stars.push(i)
   }
   let star = stars.map((i) => <GoStar key={i}/>) 
   return(
      <BookStyle>
         <Link to={`/book/${book_id}`} style={{alignSelf: 'center'}}><img src={image} alt={name} style={{width: '150px', height: '220px'}}/></Link>
         <H2>{name}</H2>
         <h2>{author}</h2>
         <h2>{genre}</h2>
         <h2>{star}</h2>
         <Button onClick={() => props.handleDelete(book_id)} >Remove from Collection</Button>
      </BookStyle>
      
      
   )
   
}

export default CollectionBook;