import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
      count: 0,
      abc: []
  },
  reducers: {
    increase: (state, action) => {
      state.count = action.payload
    },
    decrease: (state, action) =>{
        state.count = action.payload;
    },
  },
});

const { actions, reducer } = counterSlice;

export const {increase, decrease} = actions;

export default reducer;

export {counterSlice};