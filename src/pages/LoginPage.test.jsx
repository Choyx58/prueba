import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { BrowserRouter } from "react-router-dom";

// Mock de useNavigate para evitar navegación real durante las pruebas
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const testStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("LoginPage", () => {
  test("muestra errores si los campos están vacíos", async () => {
    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Simula hacer clic en el botón "Ingresar" sin llenar el formulario
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/El nombre de usuario es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

  // Segundo test: verifica comportamiento con credenciales incorrectas
  test("muestra alerta si las credenciales son incorrectas", async () => {
    window.alert = jest.fn();

    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    // Simula escribir un usuario inválido
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "usuario" },
    });
    // Simula escribir una contraseña válida pero no correspondiente al usuario
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });

    // Usa waitFor para esperar a que ocurra la alerta
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Credenciales incorrectas");
    });
  });
});
