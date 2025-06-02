import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllClaims,
  addClaim,
  deleteClaim,
  updateClaim,
} from "../../services/claimService";

const fetchClaims = createAsyncThunk("claims/fetch", async (clientId) => {
  const claims = await getAllClaims(clientId);
  return claims;
});

const addNewClaim = createAsyncThunk("claims/add", async ({ clientId, claim }) => {
  const newClaim = await addClaim(clientId, claim);
  return newClaim;
});

const removeClaim = createAsyncThunk("claims/delete", async ({ clientId, id }) => {
  await deleteClaim(clientId, id);
  return id;
});

const editClaim = createAsyncThunk("claims/update", async ({ clientId, id, updated }) => {
  const result = await updateClaim(clientId, id, updated);
  return result;
});

const claimSlice = createSlice({
  name: "claims",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewClaim.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeClaim.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(editClaim.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      });
  },
});

export default claimSlice.reducer;
export { fetchClaims, addNewClaim, removeClaim, editClaim };
