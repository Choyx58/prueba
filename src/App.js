import React, { useContext, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider } from "styled-components";
import { ThemeContext, ThemeProviderCustom } from "./context/ThemeContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/theme";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));

const AppWrapper = () => {
  const { themeMode } = useContext(ThemeContext);
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />

      {/* Suspense fallback for lazy loading */}
      <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Cargando...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeProviderCustom>
    <AppWrapper />
  </ThemeProviderCustom>
);

export default App;