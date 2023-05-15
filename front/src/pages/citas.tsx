import router from "next/router";
import { DivButton, Header } from "./index";
import { gql, useQuery } from "@apollo/client";
import { get } from "http";
import styled from "styled-components";
import { clientSSR } from "@/utils/apollo-client";
import { GetServerSideProps } from "next";
import { Slot } from "@/types";
//Esta página requiere datos del servidor para mostrar la lista
// de citas médicas actualizada. Al utilizar SSR, podemos obtener
//los datos necesarios antes de enviar la página al cliente,
//lo que garantiza que la lista esté actualizada al cargarse.

interface SlotProps {
  slots: Slot[];
}

const GET_AVAILABLE_SLOTS_QUERY = gql`
  query AvailableSlots($year: Int!, $month: Int!, $day: Int!) {
    availableSlots(year: $year, month: $month, day: $day) {
      id
      day
      month
      year
    }
  }
`;

const Citas = ({ slots }: SlotProps) => {
  const handleHome = () => {
    router.push("/");
  };
  const addCita = () => {
    router.push("/addCita");
  };
  return (
    <>
      <Header>
        Citas Médicas Disponibles
        <DivHeader>
          <button onClick={addCita}>Añadir Cita</button>
        </DivHeader>
      </Header>
      <div>
        <ul>
          {slots.map((slot) => (
            <li key={slot.id}>
              <p>Día: {slot.day}</p>
              <p>Mes: {slot.month}</p>
              <p>Año: {slot.year}</p>
            </li>
          ))}
        </ul>
      </div>
      <DivButton>
        <button onClick={handleHome}>Inicio</button>
      </DivButton>
    </>
  );
};

export default Citas;

export async function getServerSideProps(context: any) {
  const { year, month, day } = context.query;

  const { data } = await clientSSR.query({
    query: gql`
      query AvailableSlots($year: Int!, $month: Int!, $day: Int!) {
        availableSlots(year: $year, month: $month, day: $day) {
          id
          day
          month
          year
          hour
        }
      }
    `,
    variables: {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    },
  });

  return {
    props: {
      slots: data.availableSlots,
    },
  };
}

export const DivHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-left: 45px;
    margin-right: 5px
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    button {
        background-color: #4CAF50;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;

        &:hover {
            background-color: #45a049;
        }
    }
`;
