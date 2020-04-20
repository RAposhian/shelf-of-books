import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { GoStar } from 'react-icons/go';
import { FiStar } from 'react-icons/fi';

const SingleBookContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   padding: 15px;
   padding-bottom: 100px;
   height: 100vh;
`;

const H2 = styled.h2`
   font-size: 25px;
   font-weight: bold;
   margin: 2px;
   margin-bottom: 20px;
`;

const Description = styled.p`
   margin-top: 20px;
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
         handleGet();
      })
      .catch(err => console.log(err))
   }
   
   const stars = [0,0,0,0,0]
   for (let i = 0; i < rating; i++) {
      stars.splice(i, 1, 1)
   }
   let star = stars.map((e, i) => (e === 1) ? <GoStar key={i}/> : <FiStar key={i+1}/>) 
   return (
      <SingleBookContainer>
         <img src={image} alt={name} style={{width: '200px', alignSelf: 'center'}} />
         <div>
            <H2>{name}</H2>
            <h2>{author}</h2>
            <h2>{genre}</h2>
            <div style={{marginTop: '20px'}}>
               <h2 style={{marginBottom: '5px'}}>{star}</h2>
               <select onChange={e => handleSubmit(e.target.value)}>
                  <option>Update Your Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
               </select>
            </div>
            <Description>{description}</Description>
         </div>
      </SingleBookContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(BookView);