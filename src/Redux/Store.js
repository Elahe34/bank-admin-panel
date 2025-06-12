import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../Slices/ThemeSlice";
import claimsReducer from "../Slices/clients/claimSlice";
import corsOriginsReducer from "../Slices/clients/corsOriginsSlice";
import grantTypesReducer from "../Slices/clients/grantTypeSlice";
import clientSecretReducer from "../Slices/clients/secretSlice";
import postLogoutUrisReducer from "../Slices/clients/postLogoutUrisSlice";
import propertiesReducer from "../Slices/clients/propertiesSlice";
import redirectUrisReducer from "../Slices/clients/redirecturisSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    claims: claimsReducer,
    corsOrigins: corsOriginsReducer,
    grantTypes: grantTypesReducer,
    clientSecret: clientSecretReducer,
    postLogoutUris:postLogoutUrisReducer,
    properties:propertiesReducer,
    redirectUris:redirectUrisReducer,
  },
});
