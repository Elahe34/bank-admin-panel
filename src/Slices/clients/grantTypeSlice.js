import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllGrantTypes,
  addGrantTypeService,
  deleteGrantTypeService,
  updateGrantTypeService,
} from "../../services/grantTyoeServices";

export const fetchGrantTypes = createAsyncThunk(
  "grantTypes/fetch",
  async (clientId) => {
    const grantTypess = await getAllGrantTypes(clientId);
    return grantTypess;
  }
);

export const addGrantType = createAsyncThunk(
  "grantTypes/add",
  async ({ clientId, value }) => {
    const newGrantType = await addGrantTypeService(clientId, value);
    return newGrantType;
  }
);

export const removeGrantType = createAsyncThunk(
  "grantTypes/delete",
  async ({ clientId, id }) => {
    await deleteGrantTypeService(clientId, id);
    return id;
  }
);

export const editGrantType = createAsyncThunk(
  "grantTypes/update",
  async ({ clientId, id, newValue }) => {
    const updatedGrantType = await updateGrantTypeService(
      clientId,
      id,
      newValue
    );
    return updatedGrantType;
  }
);

const grantTypesSlice = createSlice({
  name: "grantTypes",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrantTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrantTypes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addGrantType.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeGrantType.fulfilled, (state, action) => {
        state.list = state.list.filter((gt) => gt.id !== action.payload);
      })
      .addCase(editGrantType.fulfilled, (state, action) => {
        const idx = state.list.findIndex((gt) => gt.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx].value = action.payload.value;
        }
      });
  },
});

export default grantTypesSlice.reducer;
