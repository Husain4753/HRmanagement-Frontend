import React,{useState} from 'react'
import { Card, CardContent, Typography,Box, CardActions, Button, TextField, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material'
import { useChangeUserLeaveMutation } from '../../../services/user';
import { getToken } from '../../../services/localStorageService';

function LeaveCard(props) {
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [remark,setRemark]=useState('')
  const [error,setError]=useState('')
  const {access_token}=getToken()
  const {element}=props
  const [changeUserLeave]=useChangeUserLeaveMutation()
  const {id,user,date_from,date_to,status,reason,remarks,app_date}=element
  const handleAcceptOpen = () => {
    setAcceptOpen(true);
  };
  const handleAcceptClose = () => {
    setAcceptOpen(false);
  };
  const handleAccept = () => {
    const data=new FormData();
    data.append('remarks',remark)
    console.log(data.get('remarks'))
    if (!data.get('remarks')){
      setError('Kindly fill remarks')
    }
    else{
      setError('')
      data.append('status','Accepted')
      const res=changeUserLeave({id,access_token,data})
      window.location.reload();
    }
    handleAcceptClose()
  };
  const handleRejectClose = () => {
    setRejectOpen(false);
  };
  const handleReject=()=>{
    const data=new FormData();
    data.append('remarks',remark)
    console.log(data.get('remarks'))
    if (!data.get('remarks')){
      setError('Kindly fill remarks')
    }
    else{
      setError('')
      data.append('status','Rejected')
      const res=changeUserLeave({id,access_token,data})
      window.location.reload();
    }
    handleRejectClose()
  }
  const handleRejectOpen=()=>{
    setRejectOpen(true);
  }
  return (
    <>
    <Card sx={{borderRadius:'10px',height:'300px',boxShadow:'4px 4px 8px 1px'}} className='card'>
        <CardContent sx={{p:1}} className='cardContent'>
            <Typography variant='h6' sx={{p:0,m:0,display:'inline'}}>{user}</Typography>
            <Typography variant='caption' sx={{display:'inline',ml:'20px'}}>{app_date}</Typography>
            <Divider/>
            <Box>
                <Typography sx={{fontSize:'20px'}}>Date</Typography>
                <Typography sx={{display:'inline'}}>From : {date_from}</Typography>
                <Typography sx={{display:'inline',ml:2}}>To : {date_to}</Typography>
            </Box>
            <Box>
              <Typography variant='body1'>Reason : {reason}</Typography>
              {status!=="Unseen"?
              <Typography variant='body1'>Remarks : {remarks}</Typography>:<>
              <TextField fullWidth label='Remarks' sx={{mt:2}} name='remark' value={remark} onChange={(e)=>{setRemark(e.target.value)}}/>
              <div style={{height:30,paddingTop:4}}>{error?<Alert severity='error' >{error}</Alert>:''}</div>
              </>}
            </Box>
        </CardContent>
        <CardActions sx={{mx:1}} className='cardActions'>
          {status==="Unseen"?<><Button color='success' variant='contained' onClick={handleAcceptOpen}>Accept</Button>
          <Button color='error' variant='contained' onClick={handleRejectOpen}>Reject</Button></>:
           <Typography 
           variant='subtitle1' 
           color={status==="Accepted"?"green":"red"} 
           >
            {status}
           </Typography>}
            </CardActions>
    </Card>
    <Dialog open={acceptOpen} onClose={handleAcceptClose}>
        <DialogTitle>Accept Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to accept this leave application
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptClose}>Cancel</Button>
          <Button onClick={handleAccept} variant="outlined" color="success">Accept</Button>
        </DialogActions>
      </Dialog>
    <Dialog open={rejectOpen} onClose={handleRejectClose}>
        <DialogTitle>Reject Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this leave application
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectClose}>Cancel</Button>
          <Button onClick={handleReject} variant="outlined" color="error">reject</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LeaveCard
