import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const BookView = props => {
   const [book, setBook] = useState({});

   useEffect(() => {
      axios.get(`/api/book/${props.match.params.id}?collection_id=${props.user.collection_id}`)
      .then(res => setBook(res.data[0]))
      .catch(err => console.log(err))
      // eslint-disable-next-line
   }, [])
   
   console.log(book);
   const {name, author, rating, genre, image} = book;
   return (
      <div>
         <img src={image} alt={name}/>
         <h2>{name}</h2>
         <h2>{author}</h2>
         <h2>{genre}</h2>
         <h2>{rating}</h2>
      </div>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(BookView);