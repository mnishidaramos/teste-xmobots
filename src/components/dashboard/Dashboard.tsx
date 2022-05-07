import * as React from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import UploadIcon from '@mui/icons-material/Upload';

import { PageContext } from '../../contexts/Content-router';
import LeafletMap from '../leafletMap/LeafletMap';

// Variável que define o tamanho da barra lateral quando aberta
const drawerWidth = 360;

/**
 * 
 * Estilização da barra lateral
 * 
 */
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

/**
 * 
 * Estilização da barra superior
 * 
 */

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * 
 * Função principal do componente do dashboard
 * 
 */
export default function Dashboard() {
  /**
   * 
   * Variáveis e funções para o menu lateral
   * 
   */
  const [open, setOpen] = React.useState(false);
  const { user, signOut, setPage } = React.useContext(PageContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Função para o click nas opções do menu lateral
  const handleClickMenu = function (option: string) {
    switch (option) {
      case 'Mapa':
        alert("Mapa!");
        break;
      case 'Upload':
        handleDiagOpen();
        break;
    }
    return null;
  }

  //Função para o botão de logout
  const logOut = () => {
    // Remove o usuário do localStorage
    signOut();
    // Redireciona para a página inicial
    setPage('index');
  };

  /**
   * 
   * Funções e variáveis para o dialogo de upload
   * 
   */
  const [diagOpen, setDiagOpen] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);

  const handleDiagOpen = () => {
    setDiagOpen(true);
  };

  const handleDiagClose = () => {
    setDiagOpen(false);
  };

  const handleUploadFile = () => {
    if (uploadFile) {
      console.log(uploadFile);
    }
    setDiagOpen(false);
    setUploadFile(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      {/* Barra superior */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Meu mapa
          </Typography>
          <Button onClick={logOut} variant="contained" color='error' sx={{ margin: 'auto 0 auto auto' }}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Avatar />
          <Typography mr={'auto'} ml={1} noWrap>Bem vindo(a), {user}</Typography>
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Mapa', 'Upload'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => handleClickMenu(text)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {/* 0 = Mapa, 1 = Upload */}
                {index === 0 ? <MapIcon /> : <UploadIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <DrawerHeader />
      </Drawer>

      {/* Conteudo */}
      <Box component="main" sx={{ position: 'absolute', left: 65, top: 65 }}>
        {/* Mapa do Leaflet */}
        <LeafletMap />
      </Box>

      {/* Modal de diálogo do Upload */}
      <Dialog open={diagOpen} onClose={handleDiagClose}>
        <DialogTitle>Upload de coodenadas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Envie aqui seu arquivo texto (.txt) ou JSON (.json) com as coordenadas para o mapa.
          </DialogContentText>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 4 }}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => e.target.files ? setUploadFile(e.target.files[0]) : null}
            />
          </Button>
          <Typography mr={'auto'} mt={1} noWrap>{uploadFile?.name}</Typography>
        </DialogContent>
        <DialogActions sx={{ mr: 1, mb: 1, ml: 'auto' }}>
          <Button onClick={handleDiagClose}>Cancelar</Button>
          <Button onClick={handleUploadFile} variant='contained' color='success'>Enviar</Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}
