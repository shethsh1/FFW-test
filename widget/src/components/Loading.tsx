import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <Box sx={{
      border: 'solid 2px #6eb2d7c7',
      px: 4,
      py: 5,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '284px'
    }}>
      <CircularProgress />
    </Box>
  )
}