import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { BtnModo, BtnSesion} from "../styles/Botones";
import { FaMoon, FaSun } from "react-icons/fa";

const Bar = styled.header`
  background: ${({ theme }) => theme.headerBg};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Button = styled.button`
  margin-left: 1rem;
  background: ${({ theme }) => theme.button};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

// Componente Header principal
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleTheme, themeMode } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);

  // Función para cerrar sesión
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Bar>
      <div>
        <strong>Bienvenido, {user?.username}</strong>
      </div>
      <div>
        <BtnModo onClick={toggleTheme}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {themeMode === "light" ? "Modo Oscuro" : "Modo Claro"}
            {themeMode === "light" ? <FaMoon /> : <FaSun />}
          </span>
        </BtnModo>
        <BtnSesion onClick={handleLogout}>Cerrar sesión</BtnSesion>
      </div>
    </Bar>
  );
};

export default Header; // Exportación del componente para su uso en otras partes
