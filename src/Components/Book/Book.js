import React from 'react';

const Book = props => {
   const {name, genre, image} = props
   console.log(props)
   return (
      <div>
         <h1>{name}</h1>
         <h2>{/*author*/}</h2>
         <h2>{genre}</h2>
         <img src={image} alt={name}/>
      </div>
   )
}

export default Book