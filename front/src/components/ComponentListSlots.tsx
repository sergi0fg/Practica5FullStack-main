import router, { useRouter } from "next/router";
import { DivButton, Header } from "@/pages/index";
import { gql, useQuery } from "@apollo/client";
import { get } from "http";
import styled from "styled-components";
import { client, clientSSR } from "@/utils/apollo-client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {Slot} from "@/types";
import { BtnAdd, BtnDelete, Container, DivHeader } from "@/pages/citas";


interface SlotsProps {
    slots: Slot[];
  }
  

const GET_AVAILABLE_SLOTS_QUERY = gql`
 query AvailableSlots($year: Int!, $month: Int!, $day: Int) {
  availableSlots(year: $year, month: $month, day: $day) {
    year
    day
    month
    hour
  }
}
`;

const ComponentListSlots = ({ slots }: SlotsProps) => {
    console.log(slots);
    //const { loading, error, data } = useQuery(GET_AVAILABLE_SLOTS_QUERY);
    const router = useRouter();
  
    const handleHome = () => {
      router.push("/");
    };
  
    const addCita = () => {
      router.push("/addCita");
    };
  
    const deleteCita = () => {
      router.push("/deleteCita");
    };
    if (!slots || slots.length === 0) {
      // Manejar el caso cuando slots no está definido o es un arreglo vacío
      return (
        <>
          <h1>Citas Médicas Disponibles</h1>
          <button onClick={handleHome}>Inicio</button>
          <p>No hay citas disponibles.</p>
        </>
      );
    }
  
    return (
      <>
        <Header>Citas Disponibles
          <DivHeader>
        <BtnAdd onClick={addCita}>Añadir Cita</BtnAdd>
        <BtnDelete onClick={deleteCita}>Eliminar Cita</BtnDelete>
  
        </DivHeader>
        </Header>
        <Container>
          {slots.map((slot:Slot) => (
            <li key={`${slot.year}-${slot.month}-${slot.day}-${slot.hour}`}>
              <p>Día: {slot.day}</p> 
              <p>Mes: {slot.month}</p>
              <p>Año: {slot.year}</p>
              <p>Hora: {slot.hour}:00</p>
            </li>
          ))}
        </Container>
        <button onClick={handleHome}>Inicio</button>
      </>
    );
  };

  export default ComponentListSlots;