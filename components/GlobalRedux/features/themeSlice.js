import { createSlice } from "@reduxjs/toolkit";

const theme = {
  theme: "light",
  change: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: theme,
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
