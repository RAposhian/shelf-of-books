import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const BookView = props => {
   const [book, setBook] = useState({});

   useEffect(() => {
      axios.get(`/api/book/${props.match.params.id}?collection_id=${props.user.collection_id}`)
      .then(res => setBook(res.data[0]))
      .catch(err => console.log(err))
   }, [])
   
   console.log(book);
   return (
      <div>
         
      </div>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(BookView);