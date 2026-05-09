import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialState = {
  isLoading: false,
  applications: []
}

export const addApplication = createAsyncThunk(
  '/applications/apply/',
  async (formData) => {
    const ret = await axios.post(`${API_URL}/api/applications/apply`, formData)
    return ret?.data
  }
)

export const approveApplication = createAsyncThunk(
  '/applications/approve',
  async (id) => {
    const ret = await axios.put(
      `${API_URL}/api/applications/approve/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return ret?.data
  }
)

export const getApplications = createAsyncThunk(
  '/applications/get/',
  async () => {
    const ret = await axios.get(`${API_URL}/api/applications/get/`)
    return ret?.data
  }
)

export const rejectApplication = createAsyncThunk(
  '/applications/reject/',
  async ({ id, profPicUrl }) => {
    console.log('Rejecting application with id:', id, profPicUrl)
    const res = await axios.delete(
      `${API_URL}/api/applications/reject/${id}`,
      profPicUrl
    )
    return res?.data
  }
)

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.isLoading = false
        state.applications = action.payload.applications
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.isLoading = false
        state.applications = []
      })
      .addCase(approveApplication.pending, (state) => {
        state.isLoading = true
      })
      .addCase(approveApplication.fulfilled, (state, action) => {
        state.isLoading = false
        //  state.applications =  action.payload.applications;
      })
      .addCase(approveApplication.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(rejectApplication.pending, (state) => {
        state.isLoading = true
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        state.isLoading = false
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload._id
        )
      })
      .addCase(rejectApplication.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default applicationSlice.reducer
