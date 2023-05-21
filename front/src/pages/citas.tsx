import router, { useRouter } from "next/router";
import { DivButton, Header } from "./index";
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
        year: 2023,
        month: 8,
        day: 8,

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



/*
export async function getStaticProps() {

  try {
    const { data } = await client.query({
      query: GET_AVAILABLE_SLOTS_QUERY,
      variables: {
        year: 2024,
        month: 1,
        day: 23,
      },
        
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

*/


export const DivHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-left: 45px;
    margin-right: 5px
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    
`;

export const BtnAdd = styled.button`

  display: inline-block;
  margin-left: 10px;
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

`;

export const BtnDelete = styled.button`

  display: inline-block;
  margin-left: 10px;
  background-color: red;
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
      background-color: black;
  }

`;

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  background-color: grey;
  width: 40rem;
  height: 20rem;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  li {
    list-style: none;
    margin-bottom: 10px;
    margin-top: 50px;
    margin: 0 auto;
    text-align: center;
    text-decoration: none;
    text-color: black;
  }
`;