import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import theme from '../../theme';
import { PageContext } from '../../contexts/Content-router';

export default function SignIn() {
  //Contexto para acesso aos dados de página e usuário
  const { user, setUser, setPage, signIn } = React.useContext(PageContext);

  //Estados para armazenar e manipular os dados do formulário
  const [salvarUsuario, setSalvarUsuario] = React.useState(false);
  const [errorUserInvalid, setErrorUserInvalid] = React.useState(false);
  const [errorUserInvMessage, setErrorUserInvMessage] = React.useState('');

  //Função chamada ao clicar no botão de entrar
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Testa se é um usuário válido
    if (user != null && user != undefined && user.trim() != '') {
      setUser(user);
      setErrorUserInvalid(false);
      setErrorUserInvMessage('');
    } else {
      setErrorUserInvalid(true); //Sinaliza que o usuário é inválido
      setErrorUserInvMessage('Usuário inválido'); //Mensagem de erro
      return false;
    }
    //Se foi selecionado para continuar conectado posteriormente
    if (salvarUsuario) {
      signIn();
    }
    //Por fim, muda a página para o mapa
    // setPage('dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: '12vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid',
            borderColor: 'secondary.light',
            padding: '3.5rem 1rem',
            borderRadius: '10px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={errorUserInvalid}//Sinaliza se o usuário é inválido
              helperText={errorUserInvMessage}//Mensagem de erro
              margin="normal"
              required={true}
              fullWidth
              id="usuario"
              label="Usuário"
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
            />
            <FormControlLabel
              control={
                <Checkbox color="success"
                  value={salvarUsuario}
                  onChange={() => { setSalvarUsuario(!salvarUsuario) }} />
              }
              label="Continuar conectado"
              id="continuarConectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
            >
              Entrar
              <LoginIcon sx={{ ml: 1 }} />
            </Button>
            <Grid container>
              <Grid item>
                Não tem uma conta?
                <Link href="#" ml={1} onClick={() => { setPage('sign-up') }}>
                  Se cadastre aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
