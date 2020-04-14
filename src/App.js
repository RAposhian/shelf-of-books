import React from 'react';
import './reset.css'
import routes from './routes';
import Header from './Components/Header/Header';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(135deg, #21abcd, #9396e1);
  height: auto;
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
      {routes}
    </Container>
  );
}

export default withRouter(App);
