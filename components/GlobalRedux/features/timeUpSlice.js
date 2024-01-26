import { createSlice } from "@reduxjs/toolkit";

const time = {
  timeUpMessage: false,
};

export const timeUpSlice = createSlice({
  name: "timeup",
  initialState: {
    value: time,
  },
  reducers: {
    timeUp: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { timeUp } = timeUpSlice.actions;
export default timeUpSlice.reducer;
