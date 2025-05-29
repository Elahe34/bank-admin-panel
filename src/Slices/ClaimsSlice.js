import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../ts/apiClient';

export const fetchClaims = createAsyncThunk(
  'claims/fetchClaims',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/claims');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت اطلاعات');
    }
  }
);

export const updateClaim = createAsyncThunk(
  'claims/updateClaim',
  async (updatedClaim, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/claims/${updatedClaim.id}`, updatedClaim);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در به‌روزرسانی');
    }
  }
);

const claimsSlice = createSlice({
  name: 'claims',
  initialState: {
    claims: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClaim.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.claims.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.claims[index] = action.payload;
        }
      })
      .addCase(updateClaim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectClaims = (state) => state.claims.claims;
export const selectLoading = (state) => state.claims.loading;
export const selectError = (state) => state.claims.error;

export default claimsSlice.reducer;
