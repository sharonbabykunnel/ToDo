import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        unSetUser: () => {
            return null;
        }
    }
});

export const { setUser, unSetUser } = userReducer.actions;

export default userReducer.reducer;