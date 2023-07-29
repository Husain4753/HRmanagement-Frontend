import { Box, Card, CardContent,Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../../admin/staff/staff.css"
import { getToken } from '../../../services/localStorageService'
import { useGetAllAnnouncementQuery } from '../../../services/user'
import Loader from '../../Loader'


function EmployeeAnnouncement() {
  const [Data,setData]=useState([])
  const {access_token}=getToken()
  const {data,isLoading,isSuccess}=useGetAllAnnouncementQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      setData([...data])
      console.log(Data)
    }
  },[isSuccess,Data,data])
  return (
    <Box className="Box">
      {isLoading && <Loader/>}
    <Box display='flex' justifyContent='center'>
      <Typography variant='h4' color='white'>
        Announcements
      </Typography>
    </Box>
      <Box mt={2}>
        {Data.map((element)=>{
          return(
          <Card sx={{my:1}}>
            <CardContent>
              <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h6' sx={{p:0,m:0,display:'inline'}}>{element.user}</Typography>
            <Typography variant='caption' sx={{display:'inline',ml:'20px'}}>{element.date}</Typography>
              </Stack>
            <hr />
            <Box>
              <Typography variant='body1'>{element.announcement}</Typography>
            </Box>
            </CardContent>
          </Card>)
        })}
      </Box>
    </Box>
  )
}

export default EmployeeAnnouncement
