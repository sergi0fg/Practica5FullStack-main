import router, { useRouter } from "next/router";
import { DivButton,  } from '@/components/ComponentIndex';
import { gql, useQuery } from "@apollo/client";
import { get } from "http";
import styled from "styled-components";
import { client, clientSSR } from "@/utils/apollo-client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Slot } from "@/types";
import { useState } from "react";
import { Form } from "./ComponentAddSlot";


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

const ComponentListSlots = ({ slots }:SlotsProps) => {
  console.log(slots);
  const router = useRouter();
  const { year, month, day } = router.query;
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const { loading, error, data } = useQuery(GET_AVAILABLE_SLOTS_QUERY, {
    client: clientSSR,
    variables: {
      year,
      month,
      day,
    },
  });

  const handleHome = () => {
    router.push('/');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const query = selectedMonth ? `/citas?month=${selectedMonth}` : `/citas?day=${selectedDay}`;
    router.push(query);
    const selectedDate = selectedMonth ? selectedMonth : selectedDay;
    const hasSlots = slots.some((slot) => slot.month === parseInt(selectedDate, 10) || slot.day === parseInt(selectedDate, 10));
    console.log(`Citas disponibles para ${selectedDate}:`, hasSlots);
  };
  

  const handleDayChange = (e:any) => {
    setSelectedDay(e.target.value);
  };

  const handleMonthChange = (e:any) => {
    setSelectedMonth(e.target.value);
  };

  const addCita = () => {
    router.push('/addCita');
  };

  const bookCita = () => {
    router.push('/bookCita');
  };

  const deleteCita = () => {
    router.push('/deleteCita');
  };

  if (!slots || slots.length === 0) {
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
      <Header>
        <h1>Citas Disponibles</h1>
        <DivHeader>
          <BtnAdd onClick={addCita}>Añadir Cita</BtnAdd>
          <BtnAdd onClick={bookCita}>Reservar Cita</BtnAdd>
          <BtnDelete onClick={deleteCita}>Eliminar Cita</BtnDelete>
        </DivHeader>
      </Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <label>
            Consultar por día:
            <input type="text" value={selectedDay} onChange={handleDayChange} />
          </label>
          <br />
          <label>
            Consultar por mes:
            <input type="text" value={selectedMonth} onChange={handleMonthChange} />
          </label>
          <br />
          <button type="submit">Consultar</button>
        </Form>
        
        {slots.map((slot: Slot) => (
          <li key={`${slot.id}-${slot.month}-${slot.day}-${slot.hour}`}>
            <p>Día: {slot.day}</p>
            <p>Mes: {slot.month}</p>
            <p>Año: {slot.year}</p>
            <p>Hora: {slot.hour}:00</p>
          </li>
        ))}
        {slots.length > 0 && (
  <p>
    {selectedMonth
      ? `Citas disponibles para el mes ${selectedMonth}: ${slots.length}`
      : `Citas disponibles para el día ${selectedDay}: ${slots.length}`}
  </p>
)}
      </Container>
      <DivButton>
        <button onClick={handleHome}>Inicio</button>
      </DivButton>
    </>
  );
};

export default ComponentListSlots;


export const Header = styled.header`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 10rem;
  background-color: grey;
  border-bottom: 1px solid #e6e6e6;
  border: solid 3px black;
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5rem;
  
  h1{
    font-size: 4rem;
    margin: 0 auto;
    margin-left: 680px;
  }

`;

export const DivHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
    align-items: center;
    
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
  height: 30rem;
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  
  li {
    list-style: none;
    margin-bottom: 10px;
    margin-top: 3rem;
    padding: 40px;
    margin: 0 auto;
    text-align: center;
    text-decoration: none;
    text-color: black;
    width: 40rem;
    height: 30rem;
  }
`;