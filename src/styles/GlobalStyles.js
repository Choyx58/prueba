import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: 'Segoe UI', sans-serif;
    transition: background 0.25s ease, color 0.25s ease;
  }

  select, input, button {
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.color};
    border: none;
    padding: 0.5rem;
    border-radius: 6px;
  }

  button {
    background: ${({ theme }) => theme.button};
    color: white;
    cursor: pointer;
  }

  button:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;
