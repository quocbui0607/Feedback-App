import { configureStore } from "@reduxjs/toolkit";
import FeedbackReducer from "./feedbackSlice";

const store = configureStore({
  reducer: {
    feedback: FeedbackReducer,
  },
});

export default store;
