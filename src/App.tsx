import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SignIn from './components/sign-in/SignIn';
import { useContext } from 'react';
import { PageContext } from './contexts/Content-router';
import Dashboard from './components/dashboard/Dashboard';

export default function App() {
  const { user, page, setPage } = useContext(PageContext);

  return (
    <Container maxWidth="md">
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
              <>
                <h1>Home</h1>
                <button onClick={() => { setPage('sign-in') }}>Sign-in</button>
              </> :
              <h1>Erro 404</h1>
      }
    </Container>
  );
}