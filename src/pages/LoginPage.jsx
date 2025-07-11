import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, FormWrapper, Input, Button, Error } from "../styles/Login";

// Definición del esquema de validación con Yup
const schema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

  const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Configuración del formulario con validación usando Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username === "admin" && password === "1234") {
      dispatch(login({ username }));
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <label htmlFor="username">Usuario</label>
          <Input id="username" {...register("username")} />
          {errors.username && <Error>{errors.username.message}</Error>}

          <label htmlFor="password">Contraseña</label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <Error>{errors.password.message}</Error>}

          <Button type="submit">Ingresar</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
