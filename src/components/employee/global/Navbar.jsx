import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './Drawer';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Navbar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer}></TemporaryDrawer>
          <AppBar sx={{backgroundColor:'#0e1938', color:'white',position:'static'}} >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu" 
                onClick={toggleDrawer("left", true)}
                sx={{display:{xs:'flex',md:'none'},mr: 2}}
              >
                <MenuIcon  />
              </IconButton>
              <Typography variant='h6'component="div" sx={{ flexGrow: 1}}>
                HR Management 
              </Typography>
              <Toolbar sx={{display:{xs:'none',sm:'flex'}}}>
              <IconButton sx={{backgroundColor:'#0e1938', color:'white'}} href="https://www.instagram.com/">
              <InstagramIcon />
              </IconButton>
              <IconButton sx={{backgroundColor:'#0e1938', color:'white'}} href='https://www.facebook.com/'>
              <FacebookIcon />
              </IconButton>
              <IconButton sx={{backgroundColor:'#0e1938', color:'white'}} href='https://www.twitter.com/'>
              <TwitterIcon />
              </IconButton>
              <IconButton sx={{backgroundColor:'#0e1938', color:'white'}} href='https://www.linkedin.com/'>
              <LinkedInIcon />
              </IconButton>
            </Toolbar>
            </Toolbar>
          </AppBar>
    </Box>
  );
}