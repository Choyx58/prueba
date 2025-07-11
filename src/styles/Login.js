// styles/login.js
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

export const FormWrapper = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.color};
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  background: ${({ theme }) => theme.button};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;
