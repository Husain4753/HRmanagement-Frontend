import {Box,Grid, Typography, Stack, Button, InputBase, IconButton, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LeaveCard from './LeaveCard';
import "../staff/staff.css"
import CsvExporter from '../../ExportToCSV';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { useGetAllUserLeaveQuery } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';
import Loader from '../../Loader';

function Leave() {
  const today = new Date().toLocaleDateString();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData,setSortedData]=useState([]);
  const [search,setSearch]=useState('')
  const {access_token}=getToken()
  const {data,isSuccess,isLoading}=useGetAllUserLeaveQuery(access_token)
  useEffect(()=>{
    if (isSuccess){
      setSortedData([...data])
    }
  },[data])
 
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
  const itemsPerPage=20;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredData = sortedData.filter((item) => {
    return item.user.toLowerCase().includes(search.toLowerCase());
  });
  const currentItems = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  }
  const changePage=(page)=>{
    setCurrentPage(page)
  }
  
  return (
    <>
    <Box className='Box'>
      {isLoading?<Loader/>:<>
      <Box display='inline'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography variant='h4' color="white">Leave Applications</Typography>
      </Box>
        <Box component='form'sx={{backgroundColor:'white', borderRadius:'20px',mr:3,mb:1,width:'200px',display:'inline-block'}} onSubmit={handleSearch}>
          <InputBase placeholder="Search" sx={{ml: 2, flex: 0,width:'140px'}} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
          <IconButton aria-label="search" type='submit'>
            <SearchIcon />
          </IconButton>
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
        <Button variant='contained' disabled={currentPage===totalPages||currentPage<1} size='small' onClick={()=>setCurrentPage(currentPage+1)} endIcon={<ArrowForwardIcon/>}>Next Page</Button>
      </Stack>
      </>}
    </Box>
    </>
  )
}

export default Leave
