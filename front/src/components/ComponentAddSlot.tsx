import { client } from '@/utils/apollo-client';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { DivButton, Header } from '@/pages/index';
import e from 'cors';


//Esta página será de tipo CSR (Client-Side Rendering)
// porque la funcionalidad de agregar un horario disponible 
//no requiere datos actualizados del servidor en tiempo real 
//y puede ser manejada completamente en el lado del cliente.

interface AddSlotProps {
  day: number;
  month: number;
  year: number;
  hour: number;
}

export const ADD_SLOT_MUTATION = gql`
 mutation Mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
  addSlot(year: $year, month: $month, day: $day, hour: $hour) {
    year
    month
    day
    hour
  }
}
`;

const  ComponentAddSlot = () => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito
  const [showAlert, setShowAlert] = useState(false);
  const [addSlot, { loading, error }] = useMutation(ADD_SLOT_MUTATION,{
    onCompleted: () => {
      setShowSuccessMessage(true),
      setShowAlert(true)
    },
  });
  const [formData, setFormData] = useState<AddSlotProps>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
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
        },
      });
      
      console.log(data);
      setShowSuccessMessage(true); 
      
      setFormData({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
      });
      alert("Añadido correctamente");
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Header>
      <h1>Agregar horario disponible</h1>
    </Header>
    <Form onSubmit={handleSubmit}>
      <label htmlFor="day">Día</label>
      <input type="number" id="day" name="day" required onChange={handleChange} />
      <label htmlFor="month">Mes</label>
      <input type="number" id="month" name="month" required onChange={handleChange} />
      <label htmlFor="year">Año</label>
      <input type="number" id="year" name="year" required onChange={handleChange} />
      <label htmlFor="hour">Hora</label>
      <input type="number" id="hour" name="hour" required onChange={handleChange} />
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: grey;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  label {
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: black;
    text-align: center;
    text-color: black;
    margin-top: 40px;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
  }
`;
