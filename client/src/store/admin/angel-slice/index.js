import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    angelsList: []
}

export const addAngel = createAsyncThunk('/angels/add', 
    async(formData) => {
        const res = await axios.post('http://localhost:5000/api/admin/angels/add/', formData);
        return (res?.data);
    }
);

export const editAngel = createAsyncThunk('/admin/angels/edit/',
    async ({id, angelData}) => {
        console.log('This Data Never Changes', angelData);
        const res = await axios.put(`http://localhost:5000/api/admin/angels/edit/${id}`, angelData,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        return res?.data;
    }
);

export const getAngels = createAsyncThunk('/admin/angels/get/', 
    async () => {
        const res = await axios.get(`http://localhost:5000/api/admin/angels/get/`);
        return res?.data;
    }
);

export const removeAngel = createAsyncThunk('/admin/angels/remove/', 
    async ({id, profPicUrl}) => {
        console.log('deleting user', id);
        const res = await axios.delete(`http://localhost:5000/api/admin/angels/remove/${id}`, profPicUrl);
        return res?.data;
    }
);

export const deleteAngelImage = createAsyncThunk('/admin/angels/deleteImage/',
    async ({angelData, image}) => {
       // console.log('Deleting Image', angelData, image);
        const res = await axios.put(`http://localhost:5000/api/admin/angels/deleteImage/${angelData._id}`, {angelData, image},
            {
                header: {
                    'Content-type': 'application/json'
                }
            }
        );
        return res?.data;
    }
);

export const deactivateAnAngel = createAsyncThunk('/admin/angels/deactivate/', 
    async (id) => {
        const res = await axios.put(`http://localhost:5000/api/admin/angels/deactivate/${id}`);
        return res?.data;
    }
);

export const activateAnAngel = createAsyncThunk('/admin/angels/activate/', 
    async (id) => {
        const res = await axios.put(`http://localhost:5000/api/admin/angels/activate/${id}`);
        return res?.data;
    }
);

const adminAngelsSlice = createSlice({
    name: "angels",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAngels.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAngels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.angelsList = action.payload.angels
        }).addCase(getAngels.rejected, (state, action) => {
            state.isLoading = false;
            state.angelsList = []
        });
    }
});

export default adminAngelsSlice.reducer;