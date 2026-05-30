import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../store/Slice/authSlice.js";
import ticketSliceReducer from "../store/Slice/ticketSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    ticket: ticketSliceReducer,
  },
});

export default store;
