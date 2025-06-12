import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUris,
  addUri,
  deleteUri,
  updateUri,
} from "../../services/redirectUriService";

const fetchUris = createAsyncThunk("redirectUris/fetch", async (clientId) => {
  const uris = await getAllUris(clientId);
  return uris;
});

const addNewUri = createAsyncThunk(
  "redirectUris/add",
  async ({ clientId, uri }) => {
    const newUri = await addUri(clientId, uri);
    return newUri;
  }
);

const removeUri = createAsyncThunk(
  "redirectUris/delete",
  async ({ clientId, id }) => {
    await deleteUri(clientId, id);
    return id;
  }
);

const editUri = createAsyncThunk(
  "redirectUris/update",
  async ({ clientId, id, updated }) => {
    const result = await updateUri(clientId, id, updated);
    return result;
  }
);

const redirectUrisSlice = createSlice({
  name: "redirectUris",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUris.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUris.fulfilled, (state, action) => {
        state.list = (action.payload ?? []).filter(
          (item) => item && typeof item.uri === "string"
        );
        state.loading = false;
      })

      .addCase(addNewUri.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeUri.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(editUri.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      });
  },
});

export default redirectUrisSlice.reducer;
export { fetchUris, addNewUri, removeUri, editUri };
