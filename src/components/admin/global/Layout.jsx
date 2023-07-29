import { CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar'
import {Grid} from '@mui/material';
import { Sidebar } from './Sidebar';
import UserProfile from '../../UserProfile';
import { getToken } from '../../../services/localStorageService';
import jwtDecode from 'jwt-decode';
export default function Layout() {
  const [is_admin,setIs_admin]=useState(null)
  const {access_token}=getToken()
  useEffect(() => {
    if (access_token!==null) {
        const Decodetoken = jwtDecode(access_token);
        setIs_admin(Decodetoken.is_admin);
      }
      },[access_token]);
  if (is_admin===true){
  return (
      <>
      <CssBaseline/>
      <UserProfile/>
      <Navbar/>
      <Grid container >
        <Grid item md={2} sm={3} xs={0} sx={{backgroundColor:"#f7f5fa"}}>
          <Sidebar />
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <Outlet/>
        </Grid>
      </Grid>
    </>
  )
}
else if (is_admin===false){
  return (<Navigate to='/employee'/>)
}
else if (!access_token){
  return (<><Navigate to='/'/></>)
}
}
