import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrigins,
  addOrigin,
  deleteOrigin,
  updateOrigin,
} from "../../services/corsOriginsService";

export const fetchOrigins = createAsyncThunk(
  "corsOrigins/fetch",
  async (clientId) => {
    const origins = await getAllOrigins(clientId);
    return origins;
  }
);

export const addNewOrigin = createAsyncThunk(
  "corsOrigins/add",
  async ({ clientId, origin }) => {
    const newOrigin = await addOrigin(clientId, origin);
    return newOrigin;
  }
);

export const removeOrigin = createAsyncThunk(
  "corsOrigins/delete",
  async ({ clientId, origin }) => {
    await deleteOrigin(clientId, origin);
    return origin;
  }
);


export const editOrigin = createAsyncThunk(
  "corsOrigins/update",
  async ({ clientId, oldId, newOrigin }) => {
    const result = await updateOrigin(clientId, oldId, newOrigin);
    return result;
  }
);

const corsOriginsSlice = createSlice({
  name: "corsOrigins",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrigins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrigins.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewOrigin.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeOrigin.fulfilled, (state, action) => {
        state.list = state.list.filter((origin) => origin.id !== action.payload);
      })
      .addCase(editOrigin.fulfilled, (state, action) => {
        const idx = state.list.findIndex((origin) => origin.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      });
  },
});

export default corsOriginsSlice.reducer;
