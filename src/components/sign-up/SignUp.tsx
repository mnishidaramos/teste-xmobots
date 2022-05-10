import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ThemeProvider } from '@mui/material/styles';

import { PageContext } from '../../contexts/Content-router';
import theme from './../../theme';

export default function SignUp() {
  const { setPage, setUser } = React.useContext(PageContext);
  const [regUser, setRegUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Testa se as senhas são iguais
    if (password === confirmPassword) {
      setErrorPassword(false);
      setErrorPasswordMessage('');
    } else {
      setErrorPassword(true);
      setErrorPasswordMessage('As senhas não conferem');
      return false;
    }
    setUser(regUser);
    // setPage('dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '8vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid',
            borderColor: 'primary.light',
            padding: '3.5rem 1rem',
            borderRadius: '10px'
          }}
        >
          <Avatar sx={{ mt: 0, mb: 1, ml: 1, mr: 1, bgcolor: 'secondary.main' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nome"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  autoFocus
                  value={regUser}
                  onChange={(event) => setRegUser(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="sobrenome"
                  label="Sobrenome"
                  name="sobrenome"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="password"
                  id="senha"
                  error={errorPassword}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmSenha"
                  label="Confirmar senha"
                  type="password"
                  id="confirmSenha"
                  error={errorPassword}
                  helperText={errorPasswordMessage}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Já possui uma conta?
                <Link href="#" ml={1} onClick={() => { setPage('sign-in') }}>
                  Faça login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
