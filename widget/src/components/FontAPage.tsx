import React from 'react'
import { Box } from '@mui/material'
import FontCard from './FontCard'
import type { FontA, Font } from '../redux/fontSlice'
import { useAppSelector } from '../redux/hooks'
import Loading from './Loading'

type props = {
  selected: number | null,
  keyboardNavigate: (event: React.KeyboardEvent<HTMLDivElement>, id: number, index: number) => void,
  setFont: (id: number) => void,
  arrayRef: React.MutableRefObject<HTMLDivElement[]>
}

export default function FontAPage({
  selected,
  keyboardNavigate,
  setFont,
  arrayRef
}: props) {
  const fontA = useAppSelector(state => state.font.fontA) as FontA
  const fontALoading = useAppSelector(state => state.font.fontALoading)

  if (fontALoading) {
    return (
      <Loading />
    )
  }

  return (
    <Box sx={{
      border: 'solid 2px #6eb2d7c7',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: '1fr',
      gridTemplateAreas:
        `
          'm  r'
          'm  ns'
        `,
      px: 4,
      py: 5,
      columnGap: '70px',
      rowGap: '40px',
      '@media screen and (max-width: 600px)': {
        overflow: 'auto',
        gridTemplateColumns: '1fr',
        gridTemplateAreas:
          ` 
            'm'
            'r'
            'ns'
          `,
        m: 2
      },

    }}>
      {
        fontA.content.map((font: Font, index: number) => (
          <Box
            ref={(e1: HTMLDivElement) => arrayRef.current[index] = e1}
            aria-label={font['color-blind-label']}
            tabIndex={0}
            onKeyDown={(event) => keyboardNavigate(event, font.id, index)}
            key={font.id}
            onClick={() => setFont(font.id)}
            sx={{
              gridArea: index === 0 ? 'm' : index == 1 ? 'r' : 'ns',
              display: 'flex',
              flexDirection: 'column',
              gap: index === 0 ? '20px' : '5px',
              opacity: selected === font.id ? '1' : '50%'
            }}>

            <Box aria-label={font['color-blind-label']} sx={{

              display: index == 0 ? 'contents' : 'flex',
              gap: '10px',
              '@media screen and (max-width: 600px)': {
                display: 'flex'
              }
            }}>
              <FontCard
                label={font['color-blind-label']}
                index={index}
                backgroundColor={font.color}
                text={font.label}
                abbr={font.abbr}
              />
            </Box>

          </Box>
        ))

      }
    </Box>
  )

}