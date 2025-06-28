import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import feedSlice from "./slices/feedSlice";
import connectionSlice from "./slices/connectionSlice";
import requestSlice from "./slices/requestSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connection: connectionSlice,
    requests: requestSlice,
  },
});

export default store;
