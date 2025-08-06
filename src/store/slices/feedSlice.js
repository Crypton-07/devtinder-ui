import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeedData: (state, action) => action.payload,
    removeFeedData: () => null,
    removeUserFromFeed: (state, action) =>
      state.filter((data) => data._id !== action.payload),
  },
});

export const { setFeedData, removeFeedData, removeUserFromFeed } =
  feedSlice.actions;
export default feedSlice.reducer;
