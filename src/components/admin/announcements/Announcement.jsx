import { Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Snackbar, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../staff/staff.css"
import AddIcon from '@mui/icons-material/Add';
import { useGetAllAnnouncementQuery, useNewAnnouncementMutation } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';
import Loader from '../../Loader';
function Announcement() {
  const [open,setOpen]=useState(false)
  const [Data,setData]=useState([])
  const [successData,setSuccessData]=useState('')
  const {access_token}=getToken()
  const [snackopen,setSnackOpen]=useState(false)
  const [serverError,setServerError]=useState({})
  const [content,setContent]=useState('')
  const handleSnackClose=()=>{
    setSnackOpen(false)
  }
  const {data,isLoading,isSuccess}=useGetAllAnnouncementQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      setData([...data])
      console.log(Data)
    }
  },[isSuccess,data,Data])
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setContent('')
    setServerError({})
    setOpen(false)
  }
  const [newAnnouncement]=useNewAnnouncementMutation()
  const handleCreate=async(e)=>{
    e.preventDefault();
    const data ={"announcement":content}
    const res=await newAnnouncement({access_token,data})
    if (res.data){
      setSnackOpen(true)
      setSuccessData(res.data.msg)
      setServerError({})
      setOpen(false)
      setContent('')
    }
    if(res.error){
      setServerError(res.error.data.errors)
    }
  }
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
      <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{position:'fixed' ,bottom:30,left:{xs:"calc(50% - 25px)",md:250}}}>
        <Tooltip title='Add new Announcement' arrow>
          <AddIcon />
        </Tooltip>
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Announcement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the content of new Announcement
          </DialogContentText>
          <Box component='form' onSubmit={handleCreate}sx={{my:2}} id="announcement-form">
          <TextField fullWidth label="Announcement " multiline maxRows={4} variant="standard" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
          </Box>
          <div style={{height:30}}>
            {serverError.announcement?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{serverError.announcement[0]}</Typography>:""}
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" variant='filled' sx={{ width: '100%' }}>
         {successData}
        </Alert>
      </Snackbar>
    </Box>
    
  )
}

export default Announcement
