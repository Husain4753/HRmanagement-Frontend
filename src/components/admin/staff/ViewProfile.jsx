import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Stack,  Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { useChangeUserProfilePhotoMutation, useGetSingleUserProfileQuery } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';
import person from '../../../images/person.jpeg'
import styled from 'styled-components';
import Loader from '../../Loader';

const Input=styled('input')({
    display:'none',
  })

function ViewProfile() {
    const [data,setData]=useState({})
    const [error,setError]=useState('')
    const [profileImage,setProfileImage]=useState('')
    const [open,setOpen]=useState(false)
    const [snackOpen,setSnackOpen]=useState(false)
    const {access_token}=getToken()
    const [changeUserProfilePhoto]=useChangeUserProfilePhotoMutation()
    const {id}=useParams()
    const { data:user,isSuccess,isLoading }=useGetSingleUserProfileQuery({access_token,id})
    useEffect(()=>{
        setData(user)
    },[isSuccess,user])

    const { username, email, department, contact, is_admin, profile_image } = data || {};
    const handleOpen=()=>{
        setOpen(true)
      }
    const handleClose=()=>{
      setOpen(false)
    }
    const handleUpdate=async(e)=>{
        e.preventDefault()
        const ProfileData=new FormData()
        ProfileData.append('profile_image',profileImage)
        const res=await changeUserProfilePhoto({id,access_token,ProfileData})
        if (res.data){
            setSnackOpen(true)
            setError('')
            handleClose()
        }
        if (res.error){
            if (profileImage){
                setError('The attached file is not supported')
            }
            else {
                setError('File not attached')
            }
        }
    }
    const handleSnackClose=()=>{
        setSnackOpen(false)
    }

    if (isLoading) {
      return(
        <Loader/>
      )
   }
    
    return (
        <>
     <Box sx={{m:{lg:8,md:7,sm:4,xs:0},mt:{lg:0,md:0,sm:0,xs:0},height:'100%'}} className='shadow'>
        <Typography className='text-center p-2' variant='h4'>
            Staff Profile
        </Typography>
        <Box className="m-3 float-end" sx={{width:{md:'150px',sm:'125px',xs:'125px'},display:{sm:'block'}}}>
            <img src={profile_image?`http://127.0.0.1:8000${profile_image}`:person} className="rounded img-fluid" alt='profile'/>
            <Typography className='text-center mt-2'>
            Staff id: {id}
            </Typography>
        </Box>
        <Box>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Username : {username}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Email : {email}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Department : {department}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Contact Number : {contact}</Typography>     
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Admin : {is_admin?'true':'false'}</Typography>
            <Box>
            <Stack direction='column' className='float-end' spacing={1} sx={{m:1}}>
            <Link to={`/admin/staff/editprofile/${id}`}><Button variant='outlined'  size='small' startIcon={<EditIcon/>}>Edit info </Button></Link>
            <Link to={`/admin/staff/changepassword/${id}`}><Button variant='outlined' color='secondary' size='small' startIcon={<EditIcon/>}>Change Password</Button></Link>
            <Button  variant='outlined'size='small' onClick={handleOpen}>Change Profile Photo</Button>
            </Stack>
            </Box>
            <Box m={4}>
            <Link to="/admin/staff" style={{textDecoration:'none'}}>Back to all staff page </Link>
            </Box>
        </Box>
     </Box>
     <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Update profile photo</DialogTitle>
        <DialogContent sx={{height:'130px'}}>
          <DialogContentText>
            Select your profile photo below
          </DialogContentText>
            <label htmlFor="profile-photo" style={{margin:10}}>
                <Input accept='image/*' id="profile-photo" type='file' onChange={(e)=>{setProfileImage(e.target.files[0])}}/>
                <Button variant="contained" component='span'>Select Profile Photo</Button>
            </label>
            <div style={{height:'10px'}}>
            {error?<Alert severity='error'>{error}</Alert>:null}
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert severity="success">Profile Photo Has Been Updated Successfully!</Alert>
      </Snackbar>
     </>   
  )
}

export default ViewProfile
