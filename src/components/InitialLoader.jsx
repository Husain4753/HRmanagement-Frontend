import { Box } from '@mui/material'
import React from 'react'
import logo from '../images/logo.png'

function InitialLoader() {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <img src={logo} alt="loader" />
      </Box>
    </>
  )
}

export default InitialLoader
