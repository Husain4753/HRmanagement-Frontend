import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useSelector } from 'react-redux';
import person from '../../../images/person.jpeg'
import Loader from '../../Loader';

function Profile() {
    const data=useSelector((state)=>state.user)
    const isLoading = useSelector((state) => state.isLoading)
    
  return (<>
    {isLoading && <Loader/>}
    <Box sx={{m:{lg:8,md:7,sm:4,xs:0},mt:{lg:0,md:0,sm:0,xs:0}}} className='shadow'>
        <Typography className='text-center p-3' variant='h4'>
            Staff Profile
        </Typography>
        <Box className="m-3 float-end" sx={{width:{md:'150px',sm:'125px',xs:'125px'},display:{sm:'flex',md:'block'},justifyContent:{sm:'center'}}}>
            <img src={data.profile_image?`http://127.0.0.1:8000/${data.profile_image}`:person} className="rounded img-fluid" alt='Profile'/>
            <Typography className='text-center mt-2'>
            Staff id: {data.id}
            </Typography>
        </Box>
        <Box>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Username : {data.username}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Email : {data.email}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Department : {data.department}</Typography>
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Contact Number : {data.contact}</Typography>     
            <Typography sx={{m:1,fontSize:'18px',p:1}}>Admin : {data.is_admin?'true':'false'}</Typography>
            <Link to='/employee/changepassword'><Button variant='outlined' color='secondary' className='m-3' startIcon={<VpnKeyIcon/>} size='small'>Change password</Button></Link>
        </Box>
     </Box>
     </>
  )
}

export default Profile
