import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import WidgetContainer from './components/WidgetContainer'
import Header from './components/Header'
import { fetchTabs, fetchFonts } from './redux/fontSlice'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import type { Tab } from './redux/fontSlice'

function App() {

  const { tabs, tabSelected } = useAppSelector(state => state.font)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchTabs()).unwrap()
      if (tabSelected === 101) {
        dispatch(fetchFonts({ id: 101, endPoint: 'fonts_a' }))
      } else if (tabSelected === 102) {
        dispatch(fetchFonts({ id: 102, endPoint: 'fonts_b' }))
      }

    }
    fetchAll()
  }, [])

  return (
    <Container maxWidth="sm" disableGutters>
      <Header title={'Please select one font'} tabs={tabs as Tab[]} />
      <WidgetContainer />
    </Container >
  )
}

export default App