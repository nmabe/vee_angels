/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
}

export const signUpUser = createAsyncThunk('/auth/signUp', 
    async(formData) => {
        const res = await axios.post('http://localhost:5000/api/auth/signUp/', formData, {
                withCredentials: true,
        });
        return (res.data);
    }
)

export const signInUser = createAsyncThunk('/auth/signIn',
    async (formData) => {
        const res = await axios.post('http://localhost:5000/api/auth/signIn/', formData, {
            withCredentials: true,
        });
        return (res.data);
    }
);

export const signOutUser = createAsyncThunk('/auth/signOut', 
    async () => {
        const res = await axios.post('http://localhost:5000/api/auth/signOut/',{}, {
            withCredentials: true,
        });
        return (res.data);
    }
);

export const authCheck = createAsyncThunk('/auth/auth-check/',
    async () => {
        const res = await axios.get('http://localhost:5000/api/auth/auth-check/', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Expires: '10'
            }
        });
        
        return (res.data);
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true
        }).addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(state);
            state.user = state.user ? state.user : {};
            state.isAuthenticated = false;
        }).addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(signInUser.pending, (state) => {
            state.isLoading = true
        }).addCase(signInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(signInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(authCheck.pending, (state) => {
            state.isLoading = true
        }).addCase(authCheck.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(authCheck.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(signOutUser.pending, (state) => {
            state.isLoading = true
        }).addCase(signOutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(signOutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = true
        });
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;