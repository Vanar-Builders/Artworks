import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: localStorage.getItem('address') || null,
  name: localStorage.getItem('name') || null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem('address', action.payload);
    },
    changeName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('name', action.payload);
    },
    removeAddress: (state) => {
      state.address = null;
      localStorage.removeItem('address');
      localStorage.removeItem('name');
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeAddress, removeAddress, changeName } = AuthSlice.actions

export default AuthSlice.reducer
