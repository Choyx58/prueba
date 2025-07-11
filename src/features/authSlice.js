import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user"));

// Crea el slice llamado "auth" que gestiona el estado de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Exporta las acciones (login y logout) para poder usarlas en otros componentes
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
