import React from 'react'
import { Card, CardContent, Typography,Box, CardActions} from '@mui/material'

function LeaveCard(props) {
  const {element}=props
  const {id,user,date_from,date_to,status,reason,remarks,app_date}=element

  return (
    <>
    <Card sx={{borderRadius:'10px',height:'250px',boxShadow:'4px 4px 8px 1px'}} className='card'>
        <CardContent sx={{p:1}} className='cardContent'>
    <Typography variant='caption' sx={{display:'inline',ml:'20px'}} className='float-end'>{app_date}</Typography>
            <Box>
                <Typography sx={{fontSize:'20px'}}>Date</Typography>
                <Typography sx={{display:'inline'}}>From : {date_from}</Typography>
                <Typography sx={{display:'inline',ml:2}}>To : {date_to}</Typography>
            </Box>
            <Box>
              <Typography variant='body1'>Reason : {reason}</Typography>
              {status!=="Unseen"?
              <Typography variant='body1'>Remarks : {remarks}</Typography>:
              <></>
            }
            </Box>
        </CardContent>
        <CardActions sx={{m:2}} className='cardActions'>
          {status==="Unseen"?<Typography variant='subtitle1' >Unseen</Typography>:
           <Typography 
           variant='subtitle1' 
           color={status==="Accepted"?"green":"red"} 
           >
            {status}
           </Typography>}
            </CardActions>
    </Card>
    </>
  )
}

export default LeaveCard
