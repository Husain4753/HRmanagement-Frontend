import { Box, Typography,Avatar,Button, Stack, Dialog, TextField,DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../staff/staff.css"
import { DataGrid } from '@mui/x-data-grid';
import CsvExporter from '../../ExportToCSV';
import { useCreateNewApplicationMutation, useGetAllResumeDetailsQuery, useNewAnnouncementMutation } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';
import Loader from '../../Loader';

function Applicant() {
  const [open,setOpen]=useState(false)
  const [snackopen,setSnackOpen]=useState(false)
  const [applicantData,setApplicantData]=useState([])
  const [email,setEmail]=useState('')
  const [serverError,setServerError]=useState({})
  const {access_token}=getToken()
  const {data,isLoading,isSuccess}=useGetAllResumeDetailsQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      const updatedData = data.map((item, index) => ({ ...item, id: index + 1 }));
      setApplicantData(updatedData); 
    }
  },[data])
 const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'dob', headerName: 'Date of Birth', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'gender', headerName: 'Gender', width: 70 },
  {
    field: 'pimage',
    headerName: 'Avatar',
    width: 70,
    renderCell: (params) => (
      <Avatar alt={params.value} src={`http://127.0.0.1:8000${params.value}`} />
    ),
  },
  {
    field: 'rdocs',
    headerName: 'Resume',
    width: 100,
    renderCell: (params) => (
      <Button
        variant='contained'
        color="primary"
        size="small"
        href={`http://127.0.0.1:8000${params.value}`}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        Download
      </Button>
    ),
  },
  { field: 'unique_id', headerName: 'Unique ID', width: 175 },
  { field: 'created_by', headerName: 'Created By', width: 150 },
];
const handleClose=()=>{
  setOpen(false)
}
// This function will be used for making a request to backend to create new Leave.
const [createNewApplication]=useCreateNewApplicationMutation()
const handleCreate=async(e)=>{
  e.preventDefault()
  const data={"email":email}
  const res =await createNewApplication({access_token,data})
  if (res.data){
    setSnackOpen(true)
    setServerError({})
    setEmail('')
    setOpen(false)
  }
  if (res.error){
    setServerError(res.error.data.errors)
  }
}

const tableHeaders=[
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Date of birth", key: "dob" },
    { label: "Address", key: "address" },
    { label: "Gender", key: "gender" },
    { label: "Profile image", key: "pimage" },
    { label: "Resume", key: "rdocs" },
    { label: "Unique Id", key: "unique_id" },
    { label: "Created By", key: "created_by" }
]
const handleSnackClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSnackOpen(false);
};
  return (
    <>
    <Box className='Box'>
      <Box display='flex' justifyContent='center' mt={1}>
        <Typography variant='h4' color='white'>Applicants details</Typography>
      </Box>
      <Stack justifyContent='space-between' sx={{mb:1}} direction='row'>
        <CsvExporter data={applicantData} filename={`Applicantdetails.csv`} headers={tableHeaders}/>
        <Button variant='contained' size='small' onClick={()=>{setOpen(true)}}>Create new Applicant</Button>
      </Stack>
      {isLoading?<Loader/>:<><Box sx={{ height: 400,width: '100%',backgroundColor:'white'}}>
      <DataGrid rows={applicantData} columns={columns} />
    </Box></>}
    </Box>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Apllicant</DialogTitle>
        <DialogContent sx={{width:'500px'}}>
          <DialogContentText>
            Enter the new Applicant email address.
          </DialogContentText>
          <Box component='form' onSubmit={(e)=>handleCreate(e)} m={2}>
          <TextField autoFocus fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <div style={{height:30}}>
            {serverError.email?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{serverError.email[0]}</Typography>:""}
            {serverError.non_field_errors?<Alert severity='error'>{serverError.non_field_errors[0]}</Alert>:''}          
          </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>handleCreate(e)} variant="contained" color="primary">Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" variant='filled' sx={{ width: '100%' }}>
          New Application has been created successfully
        </Alert>
      </Snackbar>
    </>
  )
}

export default Applicant
