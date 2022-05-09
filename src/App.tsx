import * as React from 'react';
import { useContext } from 'react';

import Container from '@mui/material/Container';

import SignIn from './components/sign-in/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/sign-up/SignUp';

import { PageContext } from './contexts/Content-router';

export default function App() {
  const { page } = useContext(PageContext);

  return (
    <Container>
      {/*
        O seguinte trecho verifica qual página deve ser exibida.
        Foi feito desta forma para simplificar o código e diminuir a utilização
        de ferramentas e pacotes de terceiros como o React Router.
      */}
      {
        page === 'sign-in' ?
          <SignIn /> :
          page === 'dashboard' ?
            <Dashboard /> :
            page === 'index' ?
              <SignIn /> :
              page === 'sign-up' ?
                <SignUp /> :
                <h1>Erro 404</h1>
      }
    </Container>
  );
}