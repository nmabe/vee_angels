/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL =
  import.meta.env.REACT_APP_API_URL || 'http://https://vee-angels.onrender.com'

export const getUsers = createAsyncThunk('/user/get', async () => {
  const res = await axios.get(`${API_URL}/api/user/get`)
  return res?.data
})

export const changePassword = createAsyncThunk(
  '/user/edit/',
  async ({ id, password }) => {
    const res = await axios.put(
      `${API_URL}/api/user/edit/${id}`,
      { password },
      {
        header: {
          'Content-type': 'application/json'
        }
      }
    )
    return res?.data
  }
)

export const editUsername = createAsyncThunk(
  '/user/edit-username/',
  async ({ id, password }) => {
    const res = await axios.put(
      `${API_URL}/api/user/edit-username/${id}`,
      { password },
      {
        header: {
          'Content-type': 'application/json'
        }
      }
    )
    return res?.data
  }
)

export const changeProfilePic = createAsyncThunk(
  '/admin/angels/edit/',
  async ({ id, formData }) => {
    const res = await axios.put(
      `${API_URL}/api/admin/angels/edit/${id}`,
      formData,
      {
        header: {
          'Content-type': 'application/json'
        }
      }
    )
    return res?.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: true,
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUsername.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUsername.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.user
      })
      .addCase(editUsername.rejected, (state, action) => {
        state.isLoading = false
        state.users = null
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.users = null
      })
  }
})

export default usersSlice.reducer
