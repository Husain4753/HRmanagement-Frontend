import {Box,Grid, Typography, Stack, Button,Fab, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Alert, Snackbar} from '@mui/material'
import React, { useEffect, useState } from 'react'
import LeaveCard from './LeaveCard';
import './Leave.css'
import CsvExporter from '../../ExportToCSV';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {getToken} from '../../../services/localStorageService'
import { format } from 'date-fns';
import { useApplyNewLeaveMutation, useGetLoggedUserLeaveQuery } from '../../../services/user';
import Loader from '../../Loader'

function EmployeeLeave() {
  const [applyNewLeave]=useApplyNewLeaveMutation()
  const [server_error,setServerError]=useState({})
  const [reason,setReason]=useState('')
  const [sortedData,setSortedData]=useState([]);
  const [snackopen,setSnackOpen]=useState(false)
  const {access_token}=getToken()
  const {data,isLoading,isSuccess}=useGetLoggedUserLeaveQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      setSortedData([...data])
    }
  },[data,isSuccess])
  const today = new Date().toLocaleDateString();
  const [open,setOpen]=useState(false)
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const tableHeaders = [
    { label: "ID", key: "id" },
    { label: "User", key: "user" },
    { label: "Date From", key: "date_from" },
    { label: "Date To", key: "date_to" },
    { label: "Status", key: "status" },
    { label: "Reason", key: "reason" },
    { label: "Remarks", key: "remarks" },
    { label: "Application Date", key: "app_date" }
  ];
  const handleSnackClose=()=>{
    setSnackOpen(false)
  }
  const sortData=()=>{
    const sortedArray = [...sortedData];
    console.log(sortedArray)
    sortedArray.sort((a, b) => {
      if (a.status === 'Unseen' && b.status !== 'Unseen') {
        return -1;
      } else if (a.status !== 'Unseen' && b.status === 'Unseen') {
        return 1;
      } else {
        return 0; 
      }
    });
    setSortedData(sortedArray);
    setCurrentPage(1);
  }
  const itemsPerPage=10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = sortedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const changePage=(page)=>{
    setCurrentPage(page)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCreate=async()=>{
    const data ={date_from:format(dateFrom, "yyyy-MM-dd'T'HH:mm:ss"),date_to:format(dateTo, "yyyy-MM-dd'T'HH:mm:ss"),reason:reason}
    const res=await applyNewLeave({access_token,data})
    if (res.data){
      setSnackOpen(true)
    }
    if (res.error){
      setServerError(res.error.data.errors)
    }
  }
  return (
    <>
    <Box height='100%'>
      <Box className='Box'>
      {isLoading && <Loader/>}
      <Box display='inline'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography variant='h4' color="white">Leave Applications</Typography>
      </Box>
      </Box>
      <Stack direction='row' justifyContent='space-between' sx={{m:1}}>
        <CsvExporter data={currentItems} filename={`leavedata ${today}.csv`} headers={tableHeaders} />
        <Button variant='contained' onClick={sortData} size='small'>Sort by Unseen</Button>
      </Stack>
      <Grid container sx={{p:2}} spacing={1}>
        {currentItems.map((element)=>{
          return(
            <Grid item xl={3} md={6} sm={12} xs={12} sx={{p:2}}>
            <LeaveCard element={element}/>
        </Grid>
        )})
      }
      </Grid>
      <Box display='flex' justifyContent='center'>
        <Stack direction='row' sx={{backgroundColor:'white',borderRadius:'5px'}}>
        {Array.from(Array(totalPages).keys()).map((page) => (
            <Button
              key={page + 1}
              variant={page + 1 === currentPage ? 'contained' : 'outlined'}
              onClick={() => changePage(page + 1)}
            >
              {page + 1}
            </Button>
          ))}
        </Stack>
      </Box>
      <Stack direction='row' justifyContent='space-between'>
        <Button variant='contained' disabled={currentPage===1} size='small' onClick={()=>setCurrentPage(currentPage-1)} startIcon={<ArrowBackIcon/>}>Last Page</Button>
        <Button variant='contained' disabled={currentPage===totalPages||totalPages===0} size='small' onClick={()=>setCurrentPage(currentPage+1)} endIcon={<ArrowForwardIcon/>}>Next Page</Button>
      </Stack>
    </Box>
    <Fab color="primary" aria-label="add" className='float-end' onClick={()=>{setOpen(true)}} sx={{position:'fixed' ,bottom:30,right:{xs:"calc(50% - 25px)",md:40}}}>
        <Tooltip title='Apply for new Leave' arrow>
          <AddIcon />
        </Tooltip>
      </Fab>
      <Dialog open={open}>
        <DialogTitle>Create New Apllicant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for new leave application.
          </DialogContentText>
          <Box component='form' onSubmit={handleCreate} my={3} mx={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker defaultValue={dateFrom} label='Date From' onChange={setDateFrom} sx={{m:1}}/>
            {server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}
            <DateTimePicker defaultValue={dateTo} label='Date To' onChange={setDateTo} sx={{m:1}}/>
            {server_error.password?<Typography style={{fontSize:12,color:'red',paddingLeft:20,paddingTop:5}}>{server_error.password[0]}</Typography>:""}
            </LocalizationProvider>
            <TextField variant='outlined'fullWidth label='Reason of leave' sx={{mt:3}} multiline rows={3} value={reason} onChange={(e)=>setReason(e.target.value)}/>
          </Box>
          {server_error.non_field_errors?<Alert severity='error'>{server_error.non_field_errors}</Alert>:''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" color="primary">Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" variant='filled' sx={{ width: '100%' }}>
          New leave application has been created successfullt
        </Alert>
      </Snackbar>
      </Box>
    </>
  )
}

export default EmployeeLeave
