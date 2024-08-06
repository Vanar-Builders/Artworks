import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: localStorage.getItem('address') || null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem('address', action.payload);
    },
    removeAddress: (state) => {
      state.address = null;
      localStorage.removeItem('address');
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeAddress, removeAddress } = AuthSlice.actions

export default AuthSlice.reducer
