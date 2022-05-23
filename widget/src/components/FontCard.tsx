import React from 'react'
import { Box } from '@mui/material'
import FontDescription from './FontDescription'

type props = {
  index: number,
  backgroundColor: string,
  text: string,
  abbr: string,
  label: string
}

export default function FontCard({ index, backgroundColor, text, abbr, label }: props) {

  return (
    <>
      <Box aria-label={label} sx={{
        height: index === 0 ? '120px' : '80px',
        width: index === 0 ? '120px' : '80px',
        backgroundColor: backgroundColor,
        borderRadius: '16px',
        border: 'solid 3px white',
        boxShadow: '0px 0px 0px 1px #000000',
        position: 'relative',
        p: '12px'
      }}>

        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            fontSize: index == 0 ? '40px' : '20px',
            fontWeight: 'bolder',
            color: '#d5d5d5'
          }}>

          {abbr}

        </Box>

      </Box>

      <Box sx={{ flex: 1, p: index === 0 ? 0 : 1, '@media screen and (max-width: 600px)': { p: 1 } }}>
        <FontDescription text={text} />
      </Box>
    </>
  )
}