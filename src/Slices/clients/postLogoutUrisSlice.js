import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostLogoutUris,
  addPostLogoutUriService,
  deletePostLogoutUriService,
  updatePostLogoutUriService,
} from "../../services/postLogoutUrisService";

export const fetchPostLogoutUris = createAsyncThunk(
  "postLogoutUris/fetch",
  async (clientId) => {
    const uris = await getAllPostLogoutUris(clientId);
    return uris;
  }
);

export const addPostLogoutUri = createAsyncThunk(
  "postLogoutUris/add",
  async ({ clientId, uri }) => {
    const newUri = await addPostLogoutUriService(clientId, uri);
    return newUri;
  }
);

export const removePostLogoutUri = createAsyncThunk(
  "postLogoutUris/delete",
  async ({ clientId, id }) => {
    await deletePostLogoutUriService(clientId, id);
    return id; 
  }
);

export const editPostLogoutUri = createAsyncThunk(
  "postLogoutUris/update",
  async ({ clientId, id, newUri }) => {
    const updatedUri = await updatePostLogoutUriService(clientId, id, newUri);
    return updatedUri;
  }
);

const postLogoutUrisSlice = createSlice({
  name: "postLogoutUris",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostLogoutUris.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostLogoutUris.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addPostLogoutUri.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removePostLogoutUri.fulfilled, (state, action) => {
        state.list = state.list.filter((uri) => uri.id !== action.payload);
      })
      .addCase(editPostLogoutUri.fulfilled, (state, action) => {
        const idx = state.list.findIndex((uri) => uri.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      });
  },
});

export default postLogoutUrisSlice.reducer;
