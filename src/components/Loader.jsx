import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // Replace with your desired color
    },
    secondary: {
      main: '#000000', // Replace with your desired color
    },
  },
});

function Loader(props) {
  const {color}=props
  return (
    <ThemeProvider theme={theme}>
    <Box display="flex" justifyContent="center" height="100vh">
      <CircularProgress thickness='5' color={color==='secondary'?'secondary':"primary"}/>
    </Box>
    </ThemeProvider>
  );
}

export default Loader;
