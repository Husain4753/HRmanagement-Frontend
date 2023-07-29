import styled from "@emotion/styled";
import { Box, Grid, TableContainer, Typography,Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup,Checkbox, Stack, Button, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useEffect, useState } from "react";
import format from "date-fns/format";
import { usePutNewApplicantDetailsMutation } from "../services/user";
import { useParams } from "react-router-dom";

function PutApplicantData() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [dob,setDob]=useState(null)
  const [address,setAddress]=useState('')
  const [gender,setGender]=useState('')
  const [pimage,setPimage]=useState()
  const [rdoc,setRdoc]=useState()
  
  // Multi Checkbox
  
  const Input=styled('input')({
    display:'none',
  })

  const [putNewApplicantDetails]=usePutNewApplicantDetailsMutation()

  const resetForm=()=>{
    setName('')
    setEmail('')
    setDob(null)
    setAddress('')
    setGender('')
    setPimage('')
    setRdoc('')
    document.getElementById("resume-form").reset()
  }

  const {uid}=useParams()

  const handleSubmit=async(e)=>{
    e.preventDefault()  
    const data=new FormData()
    data.append('name',name)
    data.append('email',email)
    data.append('dob',dob===null?null:format(dob,'yyyy-MM-dd'))
    data.append('address',address)
    data.append('gender',gender)
    data.append('pimage',pimage)
    data.append('rdocs',rdoc)
    const res=await putNewApplicantDetails({uid,data})
    console.log(res)
  }
  return (
    <>
      <Box  backgroundColor='#0e1938' p={2} >
        <Typography component='div' variant="h5"sx={{fontWeight:'bold',color:'white'}}>Hr Management</Typography>
      </Box>
    <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography component='div' variant="h6"sx={{fontWeight:'bold'}}>Fill your complete details here</Typography>
    </Box>
    <Box justifyContent='center' display='flex' alignItems='center'>
          <Box component='form' noValidate id="resume-form" p={3} onSubmit={handleSubmit} autoComplete="off" width={{md:'500px',sm:'100%'}} >
            <TextField size='small' id="name" name="name" required fullWidth margin="normal" label='Name' onChange={(e)=>{setName(e.target.value)}}/> 
            <TextField id="email" size='small' name="email" required fullWidth margin="normal" label='Email'onChange={(e)=>{setEmail(e.target.value)}}/> 
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker size='small' label=" Date of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}}/>
              </LocalizationProvider>
            </Box>
            <TextField id="address" size='small' name="address" multiline rows={2} required fullWidth margin="normal" label='Address'onChange={(e)=>{setAddress(e.target.value)}}/> 
            <FormControl fullWidth margin="normal">
              <FormLabel id="gender-radio">
                <RadioGroup row name="gender">
                  <FormControlLabel value='male' control={<Radio/>} label='Male'onChange={(e)=>{setGender(e.target.value)}}/>
                  <FormControlLabel value='female' control={<Radio/>} label='Female'onChange={(e)=>{setGender(e.target.value)}}/>
                  <FormControlLabel value='other' control={<Radio/>} label='Other' onChange={(e)=>{setGender(e.target.value)}}/>
                </RadioGroup>
              </FormLabel>
            </FormControl>
            <Stack  direction="column" spacing={3}>
              <label htmlFor="profile-photo">
                <Input accept='image/*' id="profile-photo" type='file' onChange={(e)=>{setPimage(e.target.files[0])}}/>
                <Button variant="contained" component='span'>Upload Profile Photo</Button>
              </label>
              <label htmlFor="resume-file">
                <Input accept='doc/*' id="resume-file" type='file'onChange={(e)=>{setRdoc(e.target.files[0])}}/>
                <Button variant="contained" component='span'>Upload your Resume</Button>
              </label>
            </Stack>
            <Button type="submit" variant="contained" sx={{mt:3,mb:2,px:5}} color="error">Submit</Button>
          </Box>
    </Box>
    </>
  );
}

export default PutApplicantData;
