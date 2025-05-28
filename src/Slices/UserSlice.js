import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../ts/apiClient'; // این مسیر ممکنه بسته به ساختار پروژه‌ت متفاوت باشه

// async thunk
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/clients'); // این endpoint باید تو APIت باشه
      return response.data;
    } catch (error) {
      console.error('API fetchUsers error:', error);
      return rejectWithValue(error.response?.data?.message || 'خطا در دریافت داده‌ها');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'خطا در بارگذاری کاربران';
      });
  },
});

// selector
export const selectUsers = (state) => state.user.list;

export default userSlice.reducer;
