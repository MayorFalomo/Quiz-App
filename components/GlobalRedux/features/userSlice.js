import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  photoUrl: "",
  score: 0,
  time: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

//We'll only use the action ("Login") when we want it to do something
//The Reducer will handle how that action is done
export const { loginUser } = userSlice.actions;

//While we'll export this into our store where we keep our reducers
export default userSlice.reducer;
