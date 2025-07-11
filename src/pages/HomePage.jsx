import React from "react";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
