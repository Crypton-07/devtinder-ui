import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeedData: (state, action) => action.payload,
    removeFeedData: () => null,
  },
});

export const { setFeedData, removeFeedData } = feedSlice.actions;
export default feedSlice.reducer;
