import React from 'react'
import { Box } from '@mui/material'

type props = {
  text: string
}

export default function FontDescription({ text }: props) {
  return (
    <Box sx={{
      display: 'flex'
    }}>
      <Box sx={{
        flexShrink: 0,
        width: '9px',
        height: '9px',
        borderRadius: '9px',
        backgroundColor: '#909090',
        mr: 1,
        mt: '5px',
      }}>
      </Box>
      <Box sx={{
        fontSize: '16px',
        fontWeight: 'bolder'
      }}>
        {text}
      </Box>
    </Box>
  )
}