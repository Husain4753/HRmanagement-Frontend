import React,{useState} from 'react'
import { Box, TextField,Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, MenuItem, Select, InputLabel, Snackbar, Alert } from '@mui/material'
import styled from '@emotion/styled'
import { useRegisterUserMutation } from '../../../services/user'
import { getToken } from '../../../services/localStorageService'
function AddNewStaff() {
  const [open,setOpen]=useState(false)
  const [successData,setSuccessData]=useState('')
  const [serverError,setServerError]=useState({})
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirm_password,setConfirm_password]=useState('')
  const [department,setDepartment]=useState('')
  const [contact,setContact]=useState('')
  const [profile_image,setProfile_image]=useState()
  const [is_admin,setIs_admin]=useState()

  const Input=styled('input')({
    display:'none',
    })
  
  const handleClose=()=>{
    setOpen(false)
  }
  
  const [registerUser]=useRegisterUserMutation()
  const {access_token}=getToken()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=new FormData()
    data.append('username',username)
    data.append('email',email)
    data.append('password',password)
    data.append('password2',confirm_password)
    data.append('department',department)
    data.append('contact',contact)
    data.append('profile_image',profile_image)
    data.append('is_admin',is_admin)
    const res=await registerUser({access_token,data})
    if (res.error){
      setServerError(res.error.data.errors)
    }
    if (res.data){
      setSuccessData(res.data.msg)
      setOpen(true)
      setUsername('')
      setEmail('')
      setContact('')
      setPassword('')
      setConfirm_password('')
      setDepartment('')
      setProfile_image('')
      setIs_admin(null)
      setServerError('')
    }
   }
  return (
    <>
    <Box display='flex' justifyContent='center'>
      <Box m={2} width='450px' component="form" onSubmit={handleSubmit} noValidate id="create-profile" autoComplete="off" className='shadow' p={2} alignItems='center'>
      <Typography variant='h4' sx={{}}> Create New Staff profile</Typography>
        <Box><TextField required fullWidth variant='standard' label="Username" name='username' autoComplete="off" value={username} onChange={(e)=>{setUsername(e.target.value)}}/></Box>
        <div style={{height:30}}>{serverError.username?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.username[0]}</Typography>:""}</div>
        <Box><TextField required fullWidth variant='standard' label="Email" name='email'value={email} onChange={(e)=>{setEmail(e.target.value)}}/></Box>
        <div style={{height:30}}>{serverError.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.email[0]}</Typography>:""}</div>
        <FormControl variant='standard' fullWidth sx={{mt:1}}>
              <InputLabel id="Department-select-label">Department</InputLabel>
              <Select  labelId="Department-select-label" id='department-select' value={department} label='st' onChange={(e)=>{setDepartment(e.target.value)}}>
                <MenuItem value="Billing">Billing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Noc">Noc</MenuItem>
                <MenuItem value="Rates">Rates</MenuItem>
              </Select>
              <div style={{height:30}}>{serverError.department?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.department[0]}</Typography>:""}</div>
            </FormControl>
        <Box><TextField required fullWidth variant='standard' label="Password" name='password'value={password} type='password'  autoComplete="new-password" onChange={(e)=>{setPassword(e.target.value)}}/></Box>
        <div style={{height:30}}>{serverError.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.password[0]}</Typography>:""}</div>
        <Box><TextField required fullWidth variant='standard' label="Confirm Password" name='confirm-password' value={confirm_password
        } type='password' autoComplete="confirm-password" onChange={(e)=>{setConfirm_password(e.target.value)}}/></Box>
        <div style={{height:30}}>{serverError.password2?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.password2[0]}</Typography>:""}</div>
        <Box><TextField required fullWidth variant='standard'  label="Contact" name='contact' value={contact} onChange={(e)=>{setContact(e.target.value)}}/></Box>
        <div style={{height:30}}>{serverError.contact?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.contact[0]}</Typography>:""}</div>
        <label htmlFor="profile-photo">
        <Input accept='image/*' id="profile-photo" type='file' onChange={(e)=>{setProfile_image(e.target.files[0])}}/>
        <Button variant="contained" component='span' sx={{mt:3}}>Update Profile Photo</Button>
        </label>
        <div style={{height:30}}>{serverError.profile_image?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>File not attached</Typography>:""}</div>
        <FormControl fullWidth margin="normal" >
              <FormLabel id="admin-radio">
                <Typography sx={{fontSize:'17px',color:'black'}}>Admin</Typography>
                <RadioGroup row name="admin">
                  <FormControlLabel value={true} control={<Radio/>} sx={{color:'black'}} label='True'onChange={(e)=>{setIs_admin(e.target.value)}}/>
                  <FormControlLabel value={false} control={<Radio/>} sx={{color:'black'}} label='False'onChange={(e)=>{setIs_admin(e.target.value)}}/>
                </RadioGroup>
                <div style={{height:30}}>{serverError.is_admin?<Typography style={{fontSize:12,color:'red',paddingLeft:20,}}>{serverError.is_admin[0]}</Typography>:""}</div>
              </FormLabel>
            </FormControl>
        <Box>
        <Button type='submit' variant='contained' sx={{mt:2}}>Submit</Button>
      <div style={{height:30,paddingTop:4}}>{serverError.non_field_errors?<Alert severity='error'>{serverError.non_field_errors[0]}</Alert>:''}</div>
        </Box>
      </Box>
    </Box>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">{successData}</Alert>
      </Snackbar>
    </>
  )
}

export default AddNewStaff
