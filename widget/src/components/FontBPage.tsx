import React from 'react'
import { Box } from '@mui/material'
import type { FontB } from '../redux/fontSlice'
import { useAppSelector } from '../redux/hooks'
import Loading from './Loading'

export default function FontBPage() {

  const fontBLoading = useAppSelector(state => state.font.fontBLoading)
  const fontB = useAppSelector(state => state.font.fontB) as FontB

  if (fontBLoading) {
    return (
      <Loading />
    )
  }

  return (
    <Box component="div" sx={{
      border: 'solid 2px #6eb2d7c7',
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      px: 4,
      py: 5,
      minHeight: 284,
      textAlign: 'center'
    }}>
      {fontB.content}
    </Box>
  )
}