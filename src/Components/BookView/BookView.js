import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { GoStar } from 'react-icons/go';

const SingleBookContainer = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 50px;
   padding: 10px;
   height: 100vh;
`;

const H2 = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin: 2px;
`;

const BookView = props => {
   const [book, setBook] = useState({});
   const {name, author, rating, genre, image, description, book_id} = book;
   
   useEffect(() => {
      handleGet();
      // eslint-disable-next-line
   }, [])
   
   const handleGet =() => {
      axios.get(`/api/book/${props.match.params.id}?collection_id=${props.user.collection_id}`)
      .then(res => setBook(res.data[0]))
      .catch(err => console.log(err))
   }

   const handleSubmit = ratingInput => {
      axios.put('/api/rating', {ratingInput, book_id, collection_id: props.user.collection_id})
      .then(() => {
         // setToggle(false)
         handleGet();
      })
      .catch(err => console.log(err))
   }
   
   const stars = []
   for (let i = 0; i < rating; i++) {
      stars.push(i)
   }
   let star = stars.map((i) => <GoStar key={i}/>)   
   return (
      <SingleBookContainer>
         <img src={image} alt={name} style={{width: '200px', alignSelf: 'center'}} />
         <H2>{name}</H2>
         <h2>By: {author}</h2>
         <h2>Genre: {genre}</h2>
         <div>
            <h2>Your Rating:{star}</h2>
            <select onChange={e => handleSubmit(e.target.value)}>
               <option value={1}>1</option>
               <option value={2}>2</option>
               <option value={3}>3</option>
               <option value={4}>4</option>
               <option value={5}>5</option>
            </select>
         </div>
         <p>Description: <br/> {description}</p>
      </SingleBookContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(BookView);