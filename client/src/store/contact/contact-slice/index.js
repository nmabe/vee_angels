import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const initialState = {
  isLoading: false,
  messages: []
}

export const sendMessage = createAsyncThunk(
  '/contact/send',
  async (formData) => {
    const ret = await axios.post(`${API_URL}/api/contact/`, formData)
    return ret?.data
  }
)

export const getMessages = createAsyncThunk('/contact/get', async () => {
  const ret = await axios.get(`${API_URL}/api/contact/`)
  return ret?.data
})

export const deleteMessage = createAsyncThunk('/contact/delete', async (id) => {
  const ret = await axios.delete(`${API_URL}/api/contact/${id}`)
  return ret?.data
})

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.push(action.payload.message)
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state) => {
        state.isLoading = false
        state.messages = []
      })
  }
})

export default contactSlice.reducer
