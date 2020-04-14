import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const Collection = props => {
   //attach redux to get user info and collection id. 
   //map over the list of collection books 
   const [books, setBooks] = useState([]);
   const [ratingInput, setRatingInput] = useState('');
   const [toggle, setToggle] = useState(false)

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

   const handleSubmit = id => {
      axios.put('/api/rating', {ratingInput, book_id: id, collection_id: props.user.collection_id})
      .then(() => {
         setToggle(false)
         handleGet();
      })
      .catch(err => console.log(err))
   }


   return (
      <div>
         {books.map((e, i) => (
      <div key={i}>
         <h1>{e.name}</h1>
         <h2>{e.author}</h2>
         <h2>{e.genre}</h2>
         {(toggle) ?
         (
            <>
               <input 
                  placeholder={e.rating}
                  onChange={e => setRatingInput(e.target.value)}
                  type='number' />
               <button onClick={() => handleSubmit(e.book_id)}>Submit</button>
            </>
         )
         :
         (
            <>
               <h2>{e.rating}</h2>
               <button onClick={() => setToggle(true)}>Edit Rating</button>
            </>
         )}
         <img src={e.image} alt={e.name}/>
         <button onClick={() => handleDelete(e.book_id)} >Remove from Collection</button>
      </div>
      ))}
      </div>
   )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Collection);