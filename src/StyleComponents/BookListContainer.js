import styled from 'styled-components';

const BookListContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   margin-top: 50px;
   box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.75);

   @media (min-width: 750px) {
      flex-direction: row;
      flex-wrap: wrap;
   }

   @media (min-width: 1300px) {
      
   }
`;


export default BookListContainer;