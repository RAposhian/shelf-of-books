import React from 'react';
import './reset.css'
import routes from './routes';
import Header from './Components/Header/Header';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #21abcd;
  height: 100vh;
  width: 100vw;
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
      <Header />
      {routes}
    </Container>
  );
}

export default withRouter(App);
