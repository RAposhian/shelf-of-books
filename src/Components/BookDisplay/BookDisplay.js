import React, {useState} from 'react';
import Book from './BookDisplay';

const BookDisplay =  props => {
   const [books] = useState([]);
   //map over the book list sending info through props to book component
   let mappedBooks = books.map((e, i) => <Book key={i} book={e}/>)
   
   return (
      <div>
         {mappedBooks}
      </div>
   )
}

export default BookDisplay;