import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowWidth: 0,
  isDark: false,
  isShowBackDrop: false,
  isShowMenu: false,
  isShowFilterMenu: false,
  isShowSortMenu: false,
  isShowPerPageMenu: false,
  isShowNotif: false,
  getAllproductsStatus: null,
  getUiStatus: null,
  userActionNotif: {
    status: "null",
    title: "null",
    message: "null",
  },
  sideNotif: {
    status: "null",
    title: "null",
    message: "null",
  },
};

const uiSlice = createSlice({
  name: "uislice",
  initialState,
  reducers: {
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
    setShowSideMenu(state) {
      state.isShowMenu = true;
      state.isShowBackDrop = true;
    },
    setShowFilterMenu(state) {
      state.isShowFilterMenu = true;
      state.isShowBackDrop = true;
    },
    setGetAllProductsStatus(state, action) {
      state.getAllproductsStatus = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setGetUiStatus(state, action) {
      state.getUiStatus = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    showNotif(state) {
      state.isShowNotif = true;
    },
    closeModal(state) {
      state.isShowBackDrop = false;
      state.isShowNotif = false;
      state.isShowMenu = false;
      state.isShowFilterMenu = false;
      state.isShowSortMenu = false;
      state.isShowPerPageMenu = false;
    },
    setNotif(state, action) {
      state.userActionNotif = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setSideNotif(state, action) {
      state.sideNotif = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
