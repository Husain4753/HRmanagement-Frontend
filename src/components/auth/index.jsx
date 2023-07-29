import React,{useEffect, useState} from 'react'
import { Tabs,Tab,Box } from '@mui/material'
import AdminLogin from './AdminLogin';
import EmployeeLogin from './EmployeeLogin';
import { getIsAdmin, getToken } from '../../services/localStorageService';
import { Navigate, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const TabPanel=(props)=>{
    const{children,value,index}=props;
    return (
        <div role='tabpanel' hidden={value!==index}> 
            {value===index&&(<Box>{children}</Box>)}
        </div>
    )
}
export default function Login () {
    const [is_admin,setIs_admin]=useState(null)
    const[value,setValue]=useState(0);
    const navigate=useNavigate()
    const handleChange=(event,newValue)=>{
        setValue(newValue);
    }
    const {access_token}=getToken()
    useEffect(() => {
        if (access_token) {
          const Decodetoken = jwtDecode(access_token);
          setIs_admin(Decodetoken.is_admin);
        }
      }, [access_token]);
    
      if (is_admin === null) {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 6,
            }}
          >
            <Box
              boxShadow={{ sm: 5, xs: 'none' }}
              width={{ sm: 300, xs: '100%' }}
              height={{ sm: 450, xs: '100%' }}
              borderRadius={2}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  textColor="primary"
                  indicatorColor="primary"
                  onChange={handleChange}
                >
                  <Tab
                    label="Employee Login"
                    sx={{ textTransform: 'none', fontWeight: 'bold', width: '50%' }}
                  ></Tab>
                  <Tab
                    label="Admin Login"
                    sx={{ textTransform: 'none', fontWeight: 'bold', width: '50%' }}
                  ></Tab>
                </Tabs>
                <TabPanel value={value} index={0}>
                  <EmployeeLogin />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AdminLogin />
                </TabPanel>
              </Box>
            </Box>
          </Box>
        );
      } else if (is_admin === true) {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/employee" />;
      }
    }
