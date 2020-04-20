import React, {useState} from 'react';
import useInput from '../../Hooks/useInput';
import styled from 'styled-components';
import Button from '../../StyleComponents/Button';
import axios from 'axios';


const AddBookView = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 50px;
   height: 91.5vh;
   padding: 10px;
`;

const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   padding: 10px;
   height: 300px;
   border: 2px solid black;
   border-radius: 15px;
   box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.75);
   margin-top: 20px
`;

const Input = styled.input`
   width: 250px;
   margin: 5px;
   height: 25px;
   border: none;
   text-align: center;
   align-self: center;
`;

const AddBook = props => {
   const [image, setImage] = useState('');
   const [{title, author, genre, description}, {setInput}] = useInput({
      title: '',
      author: '',
      genre: '',
      description: ''
   })

   const uploadImage = async e => {
      const files = e.target.files
      const data = new FormData()
      data.append("file", files[0])
      data.append('upload_preset', 'refternu')
      const res = await fetch (
        'https://api.cloudinary.com/v1_1/desyiuzzn/image/upload', 
        {
          method: 'POST',
          body: data
        }
      )
      const file = await res.json()
      setImage(file.secure_url)
    }

    const handleSubmit = () => {
       if(image) {
          axios.post('/api/book', {image, name: title, author, genre, description})
          .then(() => props.history.push('/bookdisplay'))
          .catch(err => console.log(err))
       }
    }

   return (
      <AddBookView>
         <img 
            src={image} 
            alt={title} 
            style={{
               width: '300px',
               height: '300px',
               border: '2px solid black',
               borderRadius: '15px',
               alignSelf: 'center',
               boxShadow: '0px 10px 40px 0px rgba(0,0,0,0.75)'}} />
         <InputContainer>
            <Input 
               type='file' 
               name='file' 
               placeholder='Upload an Image'
               onChange={uploadImage}    
               />
            <Input 
               placeholder='Title' 
               name='title' 
               value={title}
               onChange={e => setInput(e)} />
            <Input 
               placeholder='Author' 
               name='author' 
               value={author}
               onChange={e => setInput(e)} />
            <Input 
               placeholder='Genre' 
               name='genre' 
               value={genre}
               onChange={e => setInput(e)} />
            <Input 
               placeholder='Description' 
               name='description' 
               value={description}
               onChange={e => setInput(e)} />
            <Button 
               style={{width: '250px', alignSelf: 'center'}}
               onClick={handleSubmit}>Submit</Button>
         </InputContainer>
      </AddBookView>
   )
}

export default AddBook;