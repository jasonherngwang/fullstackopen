import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

const { addNotification, removeNotification } = notificationSlice.actions;

let notificationTimeout = null;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    clearTimeout(notificationTimeout);
    dispatch(addNotification(message));
    notificationTimeout = setTimeout(
      () => dispatch(removeNotification()),
      seconds * 1000
    );
  };
};

export default notificationSlice.reducer;
