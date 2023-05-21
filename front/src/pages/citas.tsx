import router, { useRouter } from "next/router";
import { DivButton, Header } from '@/components/ComponentIndex';
import { gql, useQuery } from "@apollo/client";
import { get } from "http";
import styled from "styled-components";
import { client, clientSSR } from "@/utils/apollo-client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {Slot} from "@/types";
import ComponentListSlots from "@/components/ComponentListSlots";

//Esta página requiere datos del servidor para mostrar la lista
// de citas médicas actualizada. Al utilizar SSR, podemos obtener
//los datos necesarios antes de enviar la página al cliente,
//lo que garantiza que la lista esté actualizada al cargarse.

/* 
Página "Available Slots" - SSR (Server-Side Rendering):
Esta página permite a un paciente consultar las citas disponibles
 en un determinado día o en un determinado mes. Como esta información
  puede cambiar con frecuencia y puede depender de datos actualizados del 
  servidor, se podría utilizar SSR para obtener los datos de las citas 
  disponibles y renderizar la página con los resultados antes de enviarla
  al cliente. Esto garantiza que el paciente siempre vea la información
  más reciente de las citas disponibles.
*/

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

const Citas = ({ slots }: SlotsProps) => {
  return(
    <ComponentListSlots slots={slots}/>
  )
};

export default Citas;

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: GET_AVAILABLE_SLOTS_QUERY,     
      variables:{
        year: 2030,
        month: 4,
        day: 2,

      }
    });
    
    return {
      props: {
        slots: data.availableSlots,
      },
    };
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return {
      props: {
        slots: [],
      },
    };
  }
}



