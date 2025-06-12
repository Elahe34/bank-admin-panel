import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProperties,
  addPropertyService,
  deletePropertyService,
  updatePropertyService,
} from "../../services/propertiesService";

export const fetchProperties = createAsyncThunk(
  "properties/fetch",
  async (clientId) => {
    const properties = await getAllProperties(clientId);
    return properties;
  }
);

export const addProperty = createAsyncThunk(
  "properties/add",
  async ({ clientId, property }) => {
    const newProperty = await addPropertyService(clientId, property);
    return newProperty;
  }
);

export const removeProperty = createAsyncThunk(
  "properties/delete",
  async ({ clientId, index }) => {
    await deletePropertyService(clientId, index);
    return index;
  }
);

export const editProperty = createAsyncThunk(
  "properties/update",
  async ({ clientId, index, newProperty }) => {
    const updatedProperty = await updatePropertyService(clientId, index, newProperty);
    return { index, newProperty: updatedProperty };
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.list.splice(action.payload, 1);
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        const idx = action.payload.index;
        if (idx !== -1) {
          state.list[idx] = action.payload.newProperty;
        }
      });
  },
});

export default propertiesSlice.reducer;
