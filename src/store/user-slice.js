import { createSlice } from "@reduxjs/toolkit";

//Use this url for deploying locally
// const url = 'http://localhost:4000';

//Use this url for deploying in railway cloud
const url = 'https://aknamed-backend.up.railway.app';

const userSlice = createSlice({
    name: 'user',
    initialState: {url: url, submit:false},
    reducers: {
        submit(state) {
            state.submit = true;
        }
    }
});
  

export const userActions = userSlice.actions;
export default userSlice;
