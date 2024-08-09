import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './helper/api';


export const fetchImages = createAsyncThunk(
  'gallery/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api({
        url: '/images',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload.data;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default gallerySlice.reducer;