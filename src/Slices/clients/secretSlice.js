import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllClientSecrets,
  addClientSecretService,
  deleteClientSecretService,
  updateClientSecretService,
} from "../../services/secretService";

export const fetchClientSecrets = createAsyncThunk(
  "clientSecret/fetch",
  async (clientId) => {
    const secrets = await getAllClientSecrets(clientId);
    return secrets;
  }
);

export const addClientSecret = createAsyncThunk(
  "clientSecret/add",
  async ({ clientId, secret }) => {
    const newSecret = await addClientSecretService(clientId, secret);
    return newSecret;
  }
);

export const removeClientSecret = createAsyncThunk(
  "clientSecret/delete",
  async ({ clientId, id }) => {
    console.log("removeClientSecret called with:", { clientId, id });
    await deleteClientSecretService(clientId, id);
    console.log("deleteClientSecretService resolved for id:", id);
    return id;
  }
);

export const editClientSecret = createAsyncThunk(
  "clientSecret/update",
  async ({ clientId, id, newSecret }) => {
    const updatedSecret = await updateClientSecretService(
      clientId,
      id,
      newSecret
    );
    return { id, newSecret: updatedSecret };
  }
);

const clientSecretSlice = createSlice({
  name: "clientSecret",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientSecrets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientSecrets.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addClientSecret.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeClientSecret.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => String(item.id) !== String(action.payload)
        );
      })

      .addCase(editClientSecret.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx !== -1) {
          state.list[idx] = action.payload.newSecret;
        }
      });
  },
});

export default clientSecretSlice.reducer;
