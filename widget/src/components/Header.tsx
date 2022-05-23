import React from 'react'
import { Box, Button } from '@mui/material'
import type { Tab } from '../redux/fontSlice'
import { fetchFonts } from '../redux/fontSlice'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setTab } from '../redux/fontSlice'

type props = {
  title: string,
  tabs: Tab[]
}

export default function Header({ title, tabs }: props) {
  const { tabLoading, tabSelected, fontALoading, fontBLoading } = useAppSelector(state => state.font)
  const dispatch = useAppDispatch()

  const selectTab = (endPoint: 'fonts_a' | 'fonts_b', tabId: number) => {
    dispatch(setTab(tabId))
    if (tabId === 101 && fontALoading) {
      dispatch(fetchFonts({ id: tabId, endPoint: endPoint }))
    }
    else if (tabId === 102 && fontBLoading) {
      dispatch(fetchFonts({ id: tabId, endPoint: endPoint }))
    }
  }

  if (tabLoading === true) {
    return <>Fetching...</>
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      px: 0.5,
      mb: 1
    }}>
      <Box component="h2" sx={{ m: 1 }}>{title}</Box>
      <Box>
        <Box className="tabs">
          {tabs.map((tab: Tab) =>
            <Button disableRipple onClick={() => selectTab(tab.content_endpoint, tab.id)} key={tab.id}
              sx={{
                fontSize: '10px',
                py: 0,
                color: tabSelected === tab.id ? 'green' : 'red',
                fontWeight: 'bolder'

              }}>
              {tab.label}
            </Button>
          )}

        </Box>
      </Box>
    </Box>
  )
}