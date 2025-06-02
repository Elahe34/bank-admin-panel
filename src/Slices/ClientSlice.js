import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
} from "../services/mockClientService ";

export const fetchClients = createAsyncThunk(
  "clients/fetchAll",
  async () => await getAllClients()
);

export const fetchClientById = createAsyncThunk(
  "clients/fetchById",
  async (id) => await getClientById(id)
);

export const addNewClient = createAsyncThunk(
  "clients/add",
  async (newClient) => await addClient(newClient)
);

export const updateExistingClient = createAsyncThunk(
  "clients/update",
  async ({ id, updatedClient }) => await updateClient(id, updatedClient)
);

export const deleteExistingClient = createAsyncThunk(
  "clients/delete",
  async (id) => await deleteClient(id)
);

const initialState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
      })
      .addCase(addNewClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(updateExistingClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(deleteExistingClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (c) => c.id !== action.payload.id
        );
      });
  },
});

export const { clearSelectedClient } = clientsSlice.actions;
export default clientsSlice.reducer;
