import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mobileNavOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen
    },
    closeMobileNav: (state) => {
      state.mobileNavOpen = false
    },
  },
})

export const { toggleMobileNav, closeMobileNav } = uiSlice.actions
export default uiSlice.reducer
