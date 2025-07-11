import React from "react";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Función que elimina el usuario del localStorage y recarga la página
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido, {user.username}</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default HomePage;
