import {createSlice} from  '@reduxjs/toolkit'

const initialState = {
    state: {
        error: false,
        isFetching: false,
        success: false,
        authenticated:false
    },
    user:null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   setIsFetching : (state) => {
    state.state.isFetching = true;
   },
   setLoginFailure : (state) => {
    state.state.isFetching = false;
    state.state.error = true ;
   },
   setLoginSuccess: (state, action) => {
    state.state.isFetching = false;
    state.user = action.payload.user;
    state.state.success = true;
    state.state.authenticated = true;
   },
  setRegisterSuccess: (state, action) => {
    state.state.isFetching = false;
    state.user = action.payload.user;
    state.state.success = true;
  },
  setUpdateAccount: (state, action) => {
    state.state.isFetching = false;
    state.user = action.payload.user;
    state.state.success = true;
  },
  logout: (state) => {
    state.user = null;
    state.state.isFetching = false;
    state.token = "";
    state.state.success = false;
    state.state.authenticated = false;
  },
  }, 
});

export const {
  setLoginFailure,
    setUpdateAccount,
    setIsFetching,
    setLoginSuccess,
    logout,
    setRegisterSuccess,
  } = userSlice.actions;

export default userSlice.reducer;