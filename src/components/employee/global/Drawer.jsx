import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography,Avatar, Button} from '@mui/material';
import {Divider} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from 'react-redux';
import { unSetUserInfo } from '../../../features/userSlice';
import { unSetUserToken } from '../../../features/authSlice';
import React, { useEffect, useState } from 'react';
import { removeToken } from '../../../services/localStorageService';

export const SidebarList=()=>{
  const [profile_image,setProfile_image]=useState('')
  const [username,setUsername]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(unSetUserInfo())
    dispatch(unSetUserToken())
    removeToken()
    navigate('/')
  }
  const user=useSelector((state)=>state.user)
  useEffect(()=>{
    setProfile_image(user.profile_image)
    setUsername(user.username)
  },[user])
  return(
    <Box color="#0e1938" backgroundColor="#f7f5fa">
       <List sx={{height:'100%'}}>
        <Box display='flex' justifyContent='center' alignItems='center'  pt={1} color='#0e1938'>
          <Typography sx={{"font-family": 'Courgette,cursive',"fontSize":'30px',display:{sm:'block',md:'none'}}}>Employee Panel</Typography>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Avatar sx={{width:80,height:80}} src={profile_image?`http://127.0.0.1:8000${profile_image}`:''}/>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' mb={2} mt={1} height={10}>
          <Typography variant="caption">{username}</Typography>
        </Box>
        <ListItem disablePadding>
          <ListItemButton to='/employee'>
            <ListItemIcon><AccountCircleIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="My Profile"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to='/employee/leave'>
            <ListItemIcon><EventAvailableIcon sx={{color:'#0e1938',fontSize:'30px'}}/>
              </ListItemIcon>
            <ListItemText primary="Leave"/>
          </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding>
          <ListItemButton to='/employee/announcement'>
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
        <Button variant='contained' color='error' startIcon={<LogoutIcon/>} onClick={handleLogout} sx={{mt:15,mx:3}} >Logout</Button>
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