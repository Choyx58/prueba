import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

export const BtnModo = styled.button`
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.buttonText};
  background-color: ${({ theme }) => theme.buttonBg};
  background-image: none;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
  transition: all 0.3s ease;

  // Fondo base fijo para evitar parpadeo
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    background-color: ${({ theme }) => theme.buttonBg};
    border-radius: 5px;
  }

  // Capa animada al hacer hover
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.hoverBg};
    box-shadow:
      inset 2px 2px 2px rgb(0, 0, 0),
      7px 7px 20px rgba(0, 0, 0, 0.1),
      4px 4px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.hoverText};
  }

  &:hover:after {
    height: 100%;
  }

  &:active {
    top: 2px;
  }
`;



// Botón Cerrar sesión
export const BtnSesion = styled.button`
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.text}; /* Se adapta al modo claro/oscuro */
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Fondo base para evitar parpadeos durante la animación */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.buttonBg};
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 5px;
    background-image: linear-gradient(315deg, #ff4e4e 0%, #cc0000 74%);
    box-shadow:
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #fff; /* texto blanco al pasar el cursor */
  }

  &:hover:after {
    height: 100%;
  }

  &:active {
    top: 2px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
`;

const Trigger = styled.div`
  width: 180px;
  padding: 0 40px 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.triggerBg};
  border-radius: 4px;
  line-height: 50px;
  cursor: pointer;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    right: 16px;
    margin-top: -3px;
    border-bottom: 1px solid ${({ theme }) => theme.text};
    border-right: 1px solid ${({ theme }) => theme.text};
    transform: rotate(45deg) translateY(-50%);
    transition: transform 0.4s;
  }

  &.opened:after {
    transform: rotate(-135deg) translateY(-50%);
    margin-top: 3px;
  }
`;

const Options = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.07);
  z-index: 10;

  opacity: ${({ opened }) => (opened ? 1 : 0)};
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  pointer-events: ${({ opened }) => (opened ? "all" : "none")};
  transform: translateY(${({ opened }) => (opened ? "0" : "-10px")});
  transition: all 0.3s ease-in-out;
`;

const Option = styled.div`
  padding: 12px 22px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.optionHover};
  }

  &:last-child {
    border-bottom: none;
  }

  &.selected {
    background: ${({ theme }) => theme.optionHover};
    color: ${({ theme }) => theme.text};
  }
`;

export const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <Wrapper ref={ref}>
      <Trigger
        role="button"
        aria-label={placeholder} // ✅ importante para accesibilidad y testing
        aria-expanded={opened}
        aria-haspopup="listbox"
        onClick={() => setOpened(!opened)}
        className={opened ? "opened" : ""}
        >
        {selectedOption?.label || placeholder}
      </Trigger>

      <Options opened={opened}>
        {options.map((option) => (
          <Option
            key={option.value}
            className={option.value === value ? "selected" : ""}
            onClick={() => {
              onChange(option.value);
              setOpened(false);
            }}
          >
            {option.label}
          </Option>
        ))}
      </Options>
    </Wrapper>
  );
};