import { createSlice } from "@reduxjs/toolkit";

const score = {
  score: 0,
  // timeUpMessage: false,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState: {
    value: score,
  },
  reducers: {
    scoreAnswer: (state, action) => {
      state.value = action.payload;
    },
    resetScore: (state, action) => {
      state.value = action.payload;
    },
    // timeUp: (state, action) => {
    //   state.value = action.payload;
    // },
  },
});

export const { scoreAnswer, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
