import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  width: 240px;
  height: 415px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  position: relative;
  padding: 5px;
  margin: 1rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  color: ${({ theme }) => theme.color};

  &:hover {
    box-shadow: 0px 13px 21px -5px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    font-size: 20px;
    font-weight: 300;
    font-family: 'Oswald', sans-serif;
    color: ${({ theme }) => theme.textPrimary};
    margin: 0;
  }
`;


const Img = styled.img`
  width: 100%;
  height: 305px;
  object-fit: contain;  /* Cambiado de cover a contain */
  border-radius: 4px;
  background-color: #f4f4f4;
  margin-bottom: 1rem;
`;



const ProductCard = ({ product }) => {
  return (
    <CardWrapper>
      <Img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </CardWrapper>
  );
};

export default React.memo(ProductCard);