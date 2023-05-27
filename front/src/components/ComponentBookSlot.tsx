import { client } from '@/utils/apollo-client';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { DivButton, Header } from '@/components/ComponentIndex';
import e from 'cors';
import { Form } from './ComponentAddSlot';


//Esta página será de tipo CSR (Client-Side Rendering)
// porque la funcionalidad de agregar un horario disponible 
//no requiere datos actualizados del servidor en tiempo real 
//y puede ser manejada completamente en el lado del cliente.

interface BookSlotProps {
  day: number;
  month: number;
  year: number;
  hour: number;
  dni: string;
  available: boolean;
}

export const BOOK_SLOT_MUTATION = gql`
 mutation BookSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
  bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
    available
    day
    dni
    hour
    month
    year
  }
}
`;

const  ComponentAddSlot = () => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito
  const [showAlert, setShowAlert] = useState(false);
  const [addSlot, { loading, error }] = useMutation(BOOK_SLOT_MUTATION,{
    onCompleted: () => {
      setShowSuccessMessage(true),
      setShowAlert(true)
    },
  });
  const [formData, setFormData] = useState<BookSlotProps>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    dni: "",
    available: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await addSlot({
        variables: {
          year: formData.year,
          month: formData.month,
          day: formData.day,
          hour: formData.hour,
          dni: formData.dni,
          available: formData.available,
        },
      });
      
      console.log(data);
      setShowSuccessMessage(true); 
      
      setFormData({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        dni: "",
        available: false,

      });
      alert("Añadido correctamente");
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === 'dni' ? value : parseInt(value),
    });
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Header>
      <h1>Reservar una Cita</h1>
    </Header>
    <Form onSubmit={handleSubmit}>
    <label htmlFor="year">Año</label>
    <input
      type="number"
      name="year"
      id="year"
     
      onChange={handleChange}
      required
    />
    <label htmlFor="month">Mes</label>
    <input
      type="number"
      name="month"
      id="month"

      onChange={handleChange}
      required
    />
    <label htmlFor="day">Día</label>
    <input
      type="number"
      name="day"
      id="day"
     
      onChange={handleChange}
      required
    />
    <label htmlFor="hour">Hora</label>
    <input
      type="number"
      name="hour"
      id="hour"
     
      onChange={handleChange}
      required
    />
    <label htmlFor="dni">DNI</label>
    <input
      type="text"
      name="dni"
      id="dni"
      
      onChange={handleChange}
      required
    />
    

      <button type="submit">Agregar horario disponible</button>
    { showSuccessMessage && showAlert && (<p>Añadido correctamente</p>)}

    </Form>
    <DivButton>
      <button onClick={() => router.push("/citas")}>Ver Citas</button>
      <button  onClick={() => router.push("/")}>Inicio</button>
    </DivButton>
    </>
  );
};


export default ComponentAddSlot;