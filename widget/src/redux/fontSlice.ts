import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export type Tab = {
  id: number;
  label: string;
  content_endpoint: 'fonts_a' | 'fonts_b';
}

export type Font = {
  id: number,
  abbr: string,
  color: string,
  'color-blind-label': string,
  label: string
}

export type FontA = {
  type: string
  content: Font[]
}

export type FontB = {
  type: string,
  content: string
}

export type fontState = {
  tabs?: Tab[],
  fontA?: FontA,
  fontB?: FontB,
  tabLoading: boolean,
  fontALoading: boolean,
  fontBLoading: boolean,
  tabSelected: number,
  selected: number | null
}

export const fetchTabs = createAsyncThunk<Tab[], void, { rejectValue: AxiosError }>(
  'fetch/tab',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://json.ffwagency.md/tabs')
      return data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err)
      }

    }
  }
)

export const fetchFonts = createAsyncThunk<[FontA | FontB, number], { id: number, endPoint: 'fonts_a' | 'fonts_b' }, { rejectValue: AxiosError }>(
  'fetch/fonts',
  async (tab, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://json.ffwagency.md/${tab.endPoint}`)
      return [data, tab.id]
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err)
      } else {
        throw new Error('Server Error')
      }

    }
  }
)

const selected = localStorage.getItem('selected')
const tabSelected = localStorage.getItem('tabSelected')

const initialState: fontState = {
  tabLoading: true,
  fontALoading: true,
  fontBLoading: true,
  tabSelected: tabSelected !== null ? parseInt(tabSelected) : 101,
  selected: selected !== null ? parseInt(selected) : null
}

export const fontSlice = createSlice({
  name: 'fontReducer',
  initialState,
  reducers: {

    setSelected: (state, action: PayloadAction<number | null>) => {
      const id = action.payload
      state.selected = id
      localStorage.setItem('selected', JSON.stringify(id))
    },

    setTab: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.tabSelected = id
      localStorage.setItem('tabSelected', JSON.stringify(id))
    }
  },
  extraReducers: (builder) => {

    // Get tabs
    builder.addCase(fetchTabs.fulfilled, (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload
      state.tabLoading = false
    })

    builder.addCase(fetchTabs.rejected, (state, action) => {
      console.log(action.payload)
    })

    // Get fonts
    builder.addCase(fetchFonts.fulfilled, (state, action: PayloadAction<[FontA | FontB, number]>) => {
      const [font, id] = action.payload

      if (id === 101) {
        state.fontA = font as FontA
        state.fontALoading = false
      }
      if (id === 102) {
        state.fontB = font as FontB
        state.fontBLoading = false
      }
    })

    builder.addCase(fetchFonts.rejected, (state, action) => {
      console.log(action.payload)
    })
  }

})

export const { setSelected, setTab } = fontSlice.actions

export default fontSlice.reducer