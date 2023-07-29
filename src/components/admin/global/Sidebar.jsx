import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography,Avatar, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import {Divider} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from 'react-redux';
import { unSetUserToken } from '../../../features/authSlice';
import { unSetUserInfo } from '../../../features/userSlice';
import { removeToken } from '../../../services/localStorageService';

export const SidebarList = () => {
  const [username,setUsername]=useState('')
  const [profile_image,setProfile_image]=useState('')
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user)
  useEffect(()=>{
    setUsername(user.username)
    setProfile_image(user.profile_image)
  },[user,setUsername,setProfile_image])
  
  const handleLogout=()=>{
    dispatch(unSetUserInfo())
    dispatch(unSetUserToken({access:null,refresh:null}))
    removeToken()
    navigate('/')
  }
  return(
    <Box color='#0e1938'
    backgroundColor="#f7f5fa"
    height='100%'>
       <List sx={{"height":'100%'}}>
        <Box display='flex' justifyContent='center' alignItems='center'  pt={1} color='#0e1938'>
          <Typography sx={{"font-family": 'Courgette,cursive',"fontSize":'30px',display:{sm:'block',md:'none'}}}>Admin Panel</Typography>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Avatar sx={{width:80,height:80}} src={profile_image?`http://127.0.0.1:8000${profile_image}`:null} />
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' height={20}>
          <Typography variant="caption">{username}</Typography>
        </Box>
        <ListItem disablePadding sx={{mt:2}}>
          <ListItemButton to='/admin'>
            <ListItemIcon><DashboardIcon sx={{color:'#0e1938',fontSize:'30px'}} />
             </ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>
         </ListItem>
        <ListItem disablePadding>
          <ListItemButton to='/admin/staff'>
            <ListItemIcon><AccountCircleIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="Staff"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to='/admin/leave'>
            <ListItemIcon><EventAvailableIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="Leave"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to='/admin/applicants'>
            <ListItemIcon><WorkIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="New Applications"/>
          </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding>
          <ListItemButton to='/admin/announcement'>
            <ListItemIcon><AnnouncementIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="Announcements"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to='/about'>
            <ListItemIcon><GroupsIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
              <ListItemText primary="About"/>
          </ListItemButton>
        </ListItem>
        <Button variant='contained' color='error' startIcon={<LogoutIcon/>} onClick={handleLogout} sx={{ml:5,mt :1}}>Logout</Button>
        </List>
    </Box>
)}

export default function TemporaryDrawer({state,setState,toggleDrawer}) {
  
  const list = (anchor) => (
    <Box
      sx={{width:250}} 
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      color='#0e1938'
      backgroundColor="#f7fafa"
      height="100%"
    >
      <SidebarList/>
      </Box>
  );
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor='left'
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export const Sidebar=()=>{
  return(
    <Box display={{xs:'none',md:'block'}}>
      <SidebarList/>
    </Box>
  )
}