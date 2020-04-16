import React from 'react';
import './reset.css'
import routes from './routes';
import Header from './Components/Header/Header';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(1turn, #5C656D, 10%, #DE7D00);
  height: auto;
  width: 100vw;
  position: relative;
`;

function App(props) {
  return (
    <Container>
      {(props.location.pathname !== '/')
      ?(
          <Header />
      ):
      null
      }
      {routes}
    </Container>
  );
}

export default withRouter(App);

//colors for styling

// Slate Gray: #5C656D
// Rusty Orange: #DE7D00
// Ash Gray: #999999