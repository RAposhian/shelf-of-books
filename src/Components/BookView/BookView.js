import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styled from 'styled-components';

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

   useEffect(() => {
      axios.get(`/api/book/${props.match.params.id}?collection_id=${props.user.collection_id}`)
      .then(res => setBook(res.data[0]))
      .catch(err => console.log(err))
      // eslint-disable-next-line
   }, [])
   
   const {name, author, rating, genre, image} = book;
   return (
      <SingleBookContainer>
         <img src={image} alt={name} style={{width: '200px', alignSelf: 'center'}} />
         <H2>{name}</H2>
         <h2>By: {author}</h2>
         <h2>Genre: {genre}</h2>
         <h2>Your rating:{rating}</h2>
         <p>Description</p>
      </SingleBookContainer>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(BookView);