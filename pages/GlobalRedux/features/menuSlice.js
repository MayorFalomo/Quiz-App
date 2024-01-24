import { createSlice } from "@reduxjs/toolkit";

const menu = {
  menu: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: menu,
  },
  reducers: {
    setMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
