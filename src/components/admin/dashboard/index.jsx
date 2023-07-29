import React, { useEffect, useState } from 'react'
import { Card, CardContent,Grid, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import styled from '@emotion/styled';
import {Box} from '@mui/material';
import '../../../images/logo.png'
import WorkIcon from '@mui/icons-material/Work';
import { useGetDashboardDataQuery } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';
import staff from '../staff/staff.css'
import Loader from '../../Loader';

const AdminDashboard = () => {
  const [dashData,setDashData]=useState({})
  const DashCard=styled(Card)({
    width:260,height:180,
    backgroundImage:'#e4e6ed',
    borderRadius:40,
    "&:hover":{width:263,height:183,backgroundImage:'white',}
  })
  const {access_token}=getToken()
  const {data,isloading,isSuccess}=useGetDashboardDataQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      setDashData(data)
    }
  },[data,isSuccess]) 
  return (
    <>
    {isloading?<Loader/>:
    <Box height='100%' minHeight='88.5vh' className='Box' mt={0} backgroundColor="#f7f5fa">
          <Grid container direction='row' sx={{p:5}} spacing={2}>
            <Grid item sm={6} md={6} lg={4}>
            <DashCard raised >
              <CardContent sx={{justifyContent:'center',color:'#0e1938',m:2}}>
                <Box sx={{display:'inline-flex'}}>
                  <GroupIcon sx={{mr:2,fontSize:'45px'}}/>
                  <Typography variant='h4'>Staff</Typography>
                </Box>
                <Box>
                <Typography sx={{mt:4}}>Total  : {dashData.staff_count}</Typography>
                </Box>
              </CardContent>
          </DashCard>
            </Grid>
            <Grid item sm={6} md={6} lg={4}>
            <DashCard raised >
              <CardContent sx={{justifyContent:'center',color:'#0e1938',m:2}}>
                <Box sx={{display:'inline-flex'}}>
                  <WorkIcon sx={{mr:2,fontSize:'45px'}}/>
                  <Typography variant='h5'>New Leave Applications</Typography>
                </Box>
                <Box>
                <Typography sx={{mt:3}}>Total : {dashData.leave_count}</Typography>
                </Box>
              </CardContent>
          </DashCard>
            </Grid>
            <Grid item sm={6} md={6} lg={4}>
            <DashCard raised >
              <CardContent sx={{justifyContent:'center',color:'#0e1938',m:2}}>
                <Box sx={{display:'inline-flex'}}>
                  <WorkIcon sx={{mr:2,fontSize:'45px'}}/>
                  <Typography variant='h5'>Applicants Resume</Typography>
                </Box>
                <Box>
                <Typography sx={{mt:3}}>Total : {dashData.resume_count}</Typography>
                </Box>
              </CardContent>
          </DashCard>
            </Grid>          
          </Grid>
        {/* <Grid item>Card2</Grid> */}
    </Box>}
    </>
  )
}

export default AdminDashboard
