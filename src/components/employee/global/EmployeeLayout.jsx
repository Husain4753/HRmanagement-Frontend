import { CssBaseline, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../employee/global/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Drawer";
import "../leave/Leave.css";
import UserProfile from "../../UserProfile";
import jwtDecode from "jwt-decode";
import { getToken } from "../../../services/localStorageService";

function EmployeeLayout() {
  const [is_admin,setIs_admin]=useState(null)
  const {access_token}=getToken()
  useEffect(() => {
    if (access_token) {
      const Decodetoken = jwtDecode(access_token);
      setIs_admin(Decodetoken.is_admin);
    }
  }, [access_token]);
if (is_admin===false){
  return (<>
      <CssBaseline />
      <UserProfile/>
      <Navbar />
        <Grid container>
          <Grid item md={2} sm={3} xs={0} sx={{display:'grid',backgroundColor:"#f7f5fa"}}>
            <Sidebar/>
          </Grid>
          <Grid item md={10} sm={12} xs={12} minHeight="88.5vh">
            <Outlet />
          </Grid>
        </Grid>
  </>
   
  );}
  else if (is_admin === true) {
    return <Navigate to="/admin" />;
  } 
  else if (!access_token){
    return (<><Navigate to='/'/></>)
  }
}

export default EmployeeLayout;
