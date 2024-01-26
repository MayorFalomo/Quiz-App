import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import userTheme from "./features/themeSlice";
import menuSlice from "./features/menuSlice";
import score from "./features/scoreSlice";
import time from "./features/timeUpSlice";
//N:b: The name userSlice doesn't really matter it could be anything(But for consistency really) really as long as we import the component we're defining the reducer in
const rootReducer = combineReducers({
  //?All Reducers would be here
  currentUser: userSlice,
  currentTheme: userTheme,
  menuControl: menuSlice,
  score: score,
  time: time,
});

export const store = configureStore({
  reducer: rootReducer,
});

//Or instead of doing it and combining(Which is not very necessary btw) i could simply just say
// export const stores = configureStore({
//     reducer: {
//         user: userSlice,
//     }
// })
