import router from "next/router";
import React from "react";
import styled from "styled-components";
import ComponentIndex from "@/components/ComponentIndex";


// Esta página es CSR ya que no requiere datos del servidor al cargarla.

const Home = () => {
  return <ComponentIndex />;
};

export default Home;