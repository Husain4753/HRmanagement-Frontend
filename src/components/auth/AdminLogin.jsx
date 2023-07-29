import React,{useState} from 'react'
import { Box,TextField,Button,Typography, CircularProgress, Alert } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { getToken, storeToken } from '../../services/localStorageService'
import { setUserToken } from '../../features/authSlice'
import { useLoginUserMutation } from '../../services/user'

const AdminLogin = () => {
  const navigate=useNavigate()
  const [serverError,setServerError]=useState({})
  const dispatch=useDispatch()
  const [loginUser,{isLoading}]=useLoginUserMutation()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const user={
      username:data.get('username'),
      password:data.get('password')
    }
    const res= await loginUser(user)
    if(res.error){
      setServerError(res.error.data.errors)
     }
    if(res.data){
      const decodedToken = jwtDecode(res.data.token.access);
      const isAdmin= decodedToken.is_admin
      if (!isAdmin){
        setServerError({non_field_errors:["Email or Password is not valid"]})
      }
      else {
        storeToken(res.data.token)
        let {access_token,refresh_token}=getToken()
        dispatch(setUserToken({access_token:access_token,refresh_token:refresh_token}))
        navigate('/admin')
      }
    }
  }
  return ( 
    <div>
      <Box alignItems="center" justifyContent='center' display='flex' pt={2}>
        <img src={logo} alt="" height={50} width={50}/>
      </Box>
      <Box alignItems="center" justifyContent='center' display='flex' >
        <Typography variant='h6'>Admin Login</Typography>
      </Box>
      <Box component='form'onSubmit={handleSubmit} noValidate id="loginform" sx={{m:2,height:'60vh'}}>
            <TextField variant="standard" required fullWidth id='username' name='username' label="Username"/>
            <div style={{height:30}}>{serverError.username?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{serverError.username[0]}</Typography>:""}</div>
            <TextField required fullWidth id='password'  variant="standard" name='password' label="Password" type='password'/>
            <div style={{height:30}}>{serverError.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{serverError.password[0]}</Typography>:""}</div>
            <Box textAlign='center'>
            {isLoading?<CircularProgress/>:<Button type='submit' variant='contained' sx={{mb:2,px:5}}>Login</Button>}
            </Box>
            <NavLink to='/sendpasswordresetemail'>
                Forgot Password ?
            </NavLink>
            <div style={{height:30,paddingTop:4}}>{serverError.non_field_errors?<Alert severity='error'>{serverError.non_field_errors[0]}</Alert>:''}</div>
        </Box>
    </div>
  )
}

export default AdminLogin
