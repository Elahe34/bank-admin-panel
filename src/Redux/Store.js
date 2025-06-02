import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../Slices/ThemeSlice";
import claimsReducer from "../Slices/clients/claimSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    claims: claimsReducer,
  },
});
