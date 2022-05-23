import React, { useRef } from 'react'
import { setSelected } from '../redux/fontSlice'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import FontAPage from './FontAPage'
import FontBPage from './FontBPage'

export default function WidgetContainer() {
  const { selected, tabSelected } = useAppSelector(state => state.font)
  const arrayRef = useRef<HTMLDivElement[]>([])
  const dispatch = useAppDispatch()

  const setFont = (id: number) => {
    if (selected === id) {
      dispatch(setSelected(null))
    } else {
      dispatch(setSelected(id))
    }
  }

  const keyboardNavigate = (event: React.KeyboardEvent<HTMLDivElement>, id: number, index: number) => {
    if (event.key === 'Enter') {
      if (selected === id) {
        dispatch(setSelected(null))
      } else {
        dispatch(setSelected(id))
      }
    }

    if (event.key === 'ArrowLeft') {
      if (index === 0) {
        arrayRef.current.at(-1)?.focus()
        return
      }
      arrayRef.current[index - 1].focus()
    }

    if (event.key === 'ArrowRight') {
      if (index === (arrayRef.current.length - 1)) {
        arrayRef.current[0].focus()
        return
      }
      arrayRef.current?.[index + 1].focus()
    }

  }

  return (
    <>
      {tabSelected === 101 ?
        <FontAPage
          selected={selected}
          keyboardNavigate={keyboardNavigate}
          setFont={setFont}
          arrayRef={arrayRef}
        />
        : tabSelected === 102 ?

          <FontBPage />

          : <></>
      }

    </>

  )
}