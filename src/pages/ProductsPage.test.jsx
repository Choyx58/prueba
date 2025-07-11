import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductsPage from "./ProductsPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import { ThemeContext } from "../context/ThemeContext";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();


// 👉 MOCK GLOBAL para IntersectionObserver (evita errores en JSDOM)
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// 👉 MOCK de contexto de tema
const mockThemeContext = {
  themeMode: "light",
  toggleTheme: jest.fn(),
};

// 👉 Utilidad para renderizar con todos los envoltorios
const renderWithProviders = (store) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContext}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <ProductsPage />
          </ThemeProvider>
        </ThemeContext.Provider>
      </BrowserRouter>
    </Provider>
  );

test("muestra mensaje de carga mientras se obtienen productos", () => {
  const store = mockStore({
    products: {
      list: [],
      status: "loading",
      error: null,
    },
    categories: {
      items: [],
      loading: false,
      error: null,
    },
    auth: {
      user: { name: "Test User" },
    },
  });

  renderWithProviders(store);
  expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();
});

test("muestra productos cuando la carga fue exitosa", () => {
  const mockProducts = [
    { id: 1, title: "Camisa", price: 25.99, category: "ropa" },
    { id: 2, title: "Zapatos", price: 49.99, category: "calzado" },
  ];

  const store = configureStore({
    reducer: {
      products: () => ({ list: mockProducts, status: "succeeded" }),
      auth: () => ({ user: { name: "Test" } }),
    },
  });

  renderWithProviders(store);

  expect(screen.getByText("Camisa")).toBeInTheDocument();
  expect(screen.getByText("Zapatos")).toBeInTheDocument();
});

test("muestra mensaje de error si falla la carga", () => {
  const store = configureStore({
    reducer: {
      products: () => ({
        list: [],
        status: "failed",
        error: "Error al obtener productos",
      }),
      auth: () => ({ user: { name: "Test" } }),
    },
  });

  renderWithProviders(store);

  expect(screen.getByText(/error al cargar productos/i)).toBeInTheDocument();
  expect(screen.getByText(/error al obtener productos/i)).toBeInTheDocument();
});