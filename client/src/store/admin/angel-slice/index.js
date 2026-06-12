import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://vee-angels.onrender.com'
const initialState = {
  isLoading: false,
  angelsList: []
}

export const addAngel = createAsyncThunk('/angels/add', async (formData) => {
  const res = await axios.post(`${API_URL}/api/admin/angels/add/`, formData)
  return res?.data
})

export const editAngel = createAsyncThunk(
  '/admin/angels/edit/',
  async ({ id, angelData }) => {
    const res = await axios.put(
      `${API_URL}/api/admin/angels/edit/${id}`,
      angelData,
      {
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
    return res?.data
  }
)

export const getAngels = createAsyncThunk('/admin/angels/get/', async () => {
  const res = await axios.get(`${API_URL}/api/admin/angels/get/`)
  return res?.data
})

export const removeAngel = createAsyncThunk(
  '/admin/angels/remove/',
  async ({ id, profPicUrl }) => {
    const res = await axios.delete(
      `${API_URL}/api/admin/angels/remove/${id}`,
      profPicUrl
    )
    return res?.data
  }
)

export const deleteAngelImage = createAsyncThunk(
  '/admin/angels/deleteImage/',
  async ({ angelData, image }) => {
    const res = await axios.put(
      `${API_URL}/api/admin/angels/deleteImage/${angelData._id}`,
      { angelData, image },
      {
        header: {
          'Content-type': 'application/json'
        }
      }
    )
    return res?.data
  }
)

export const deactivateAnAngel = createAsyncThunk(
  '/admin/angels/deactivate/',
  async (id) => {
    const res = await axios.put(`${API_URL}/api/admin/angels/deactivate/${id}`)
    return res?.data
  }
)

export const activateAnAngel = createAsyncThunk(
  '/admin/angels/activate/',
  async (id) => {
    const res = await axios.put(`${API_URL}/api/admin/angels/activate/${id}`)
    return res?.data
  }
)

const adminAngelsSlice = createSlice({
  name: 'angels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAngels.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAngels.fulfilled, (state, action) => {
        state.isLoading = false
        state.angelsList = action.payload.angels
      })
      .addCase(getAngels.rejected, (state, action) => {
        state.isLoading = false
        state.angelsList = []
      })
  }
})

export default adminAngelsSlice.reducer
