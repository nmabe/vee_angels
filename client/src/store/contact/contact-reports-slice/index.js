import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    isLoading: false,
    reports: []
}

export const getReports = createAsyncThunk('/contact/getReports',
    async () => {
        const ret = await axios.get('http://localhost:5000/api/contact/report');
        return (ret?.data);
    }
);

export const deleteReport = createAsyncThunk('/contact/deleteReport',
    async (id) => {
        const ret = await axios.delete(`http://localhost:5000/api/contact/report/${id}`);
        return (ret?.data);
    }
);

export const addReport = createAsyncThunk('/contact/addReport',
    async (formData) => {
        const ret = await axios.post('http://localhost:5000/api/contact/report', formData);
        return (ret?.data);
    }
);

const contactReportsSlice = createSlice({
    name: 'contactReports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReports.pending, (state) => {
            state.isLoading = true;
        }).addCase(getReports.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reports = action.payload;
        }).addCase(getReports.rejected, (state) => {
            state.isLoading = false;
            state.reports = [];
        }).addCase(deleteReport.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteReport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reports = state.reports.filter(report => report._id !== action.payload.id);
        }).addCase(deleteReport.rejected, (state) => {
            state.isLoading = false;
        }).addCase(addReport.pending, (state) => {
            state.isLoading = true;
        }).addCase(addReport.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reports.push(action.payload);
        }).addCase(addReport.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default contactReportsSlice.reducer;