import React,{useEffect, useState} from 'react'
import { Box, TextField,Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, MenuItem, Select, InputLabel, Snackbar, Alert } from '@mui/material'
import styled from '@emotion/styled'
import { getToken } from '../../../services/localStorageService'
import { Sledding, UsbOffTwoTone } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useGetSingleUserProfileQuery,useUpdateUserInfoMutation } from '../../../services/user'
import Loader from '../../Loader'
function EditProfile() {
  const [currentProfile,setCurrentProfile]=useState({})
  const [department,setDepartment]=useState('')
  const [snackOpen,setSnackOpen]=useState(false)
  const [serverError,setServerError]=useState({})
  const [is_admin,setIs_admin]=useState(null)
  const {access_token}=getToken()
  const [successMsg,setSuccessMsg]=useState()
  const [updateUserInfo,]=useUpdateUserInfoMutation()
  const {id}=useParams()
  const { data:user,isSuccess,isLoading}=useGetSingleUserProfileQuery({access_token,id})
  useEffect(()=>{
    setCurrentProfile(user)
  },[isSuccess,user])
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    const actualData={
      username:data.get('username'),
      email:data.get('email'),
      department:department?department:currentProfile.department,
      contact:data.get('contact'),
      is_admin:is_admin?is_admin:currentProfile.is_admin
    }
    const res=await updateUserInfo({id,access_token,actualData})
    if (res.data){
      setSuccessMsg(res.data.msg) 
      setSnackOpen(true)
    }
    if(res.error){
      setServerError(res.error.data.errors)
    }
   }
   if (isLoading || !currentProfile || Object.keys(currentProfile).length === 0) {
      return(
        <Loader/>
      )
   }
   const handleSnackClose=()=>{
    setSnackOpen(false)
   }
  return (
    <>
    <Box display='flex' justifyContent='center'>
      <Box m={2} width='500px' component="form" onSubmit={handleSubmit} noValidate id="edit-profile" autoComplete="off" className='shadow' p={2} alignItems='center' justifyContent='center'>
      <Typography variant='h3' alignContent='center'> Edit Staff profile</Typography>
        <Box my={2}><TextField required variant='standard' label="Id" value={currentProfile.id}  name='id' disabled margin="normal" /></Box>
        <Box><TextField required fullWidth variant='standard' label="Username" defaultValue={currentProfile?.username||''} name='username' autoComplete="off" /></Box>
        <div style={{height:30}}>{serverError.username?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.username[0]}</Typography>:""}</div>
        <Box><TextField required fullWidth variant='standard' label="Email" defaultValue={currentProfile?.email||''} name='email' /></Box>
        <div style={{height:20}}>{serverError.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20}}>{serverError.email[0]}</Typography>:""}</div>
        <FormControl required variant='standard' fullWidth sx={{mt:1}}>
              <InputLabel id="Department-select-label">Department</InputLabel>
              <Select  labelId="Department-select-label" id='department-select' defaultValue={currentProfile?.department||''} onChange={(e)=>{setDepartment(e.target.value)}}>
                <MenuItem value="Noc" >Noc</MenuItem>
                <MenuItem value="Billing" >Billing</MenuItem>
                <MenuItem value="Sales" >Sales</MenuItem>
                <MenuItem value="Rates" >Rates</MenuItem>
              </Select>
            </FormControl>
        <Box sx={{mt:3}}><TextField fullWidth variant='standard' required label="Contact" defaultValue={currentProfile?.contact||''} name='contact' /></Box>
        <div style={{height:30}}>{serverError.contact?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.contact[0]}</Typography>:""}</div>
        <FormControl fullWidth margin="normal" >
              <FormLabel id="admin-radio">
                <Typography sx={{fontSize:'17px',color:'black'}}>Admin</Typography>
                <RadioGroup row name="admin" >
                  <FormControlLabel defaultChecked={currentProfile.is_admin===true} value={true} sx={{color:'black'}} control={<Radio/>} label='True' onChange={(e)=>{setIs_admin(true)}}/>
                  <FormControlLabel value={false} defaultChecked={currentProfile.is_admin===false} sx={{color:'black'}} control={<Radio/>} label='False'onChange={(e)=>{setIs_admin(false)}}/>
                </RadioGroup>
              </FormLabel>
            </FormControl>
        <Box>
        <Button type='submit' variant='contained' sx={{mt:2}}>Submit</Button>
        </Box>
      </Box>
    </Box>
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
    </>
  )
}

export default EditProfile
