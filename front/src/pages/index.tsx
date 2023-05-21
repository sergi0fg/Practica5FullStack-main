import router from "next/router";
import React from "react";
import styled from "styled-components";

// Esta página es CSR ya que no requiere datos del servidor al cargarla.

const Home = () => {
  const handleCitas = () => {
    router.push("/citas");
  };
  return (
    <>
      <Header>Aplicación de citas médicas</Header>
      <DivButton>
        <button onClick={handleCitas}>Ver Citas</button>
      </DivButton>
    </>
  );
};

export default Home;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 10rem;
  background-color: grey;
  border-bottom: 1px solid #e6e6e6;
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5rem;
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  button {
    height: 4rem;
    width: 10rem;
    border-radius: 0.5rem;
    background-color: grey;
    color: white;
    cursor: pointer;
    border: none;
    font-size: 1.2rem;
    &:hover {
      background-color: #e6e6e6;
      color: black;
    }
  }
`;
