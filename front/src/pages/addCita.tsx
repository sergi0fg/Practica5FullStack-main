import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';


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
  mutation AddSlot($day: Int!, $month: Int!, $year: Int!, $hour: Int!) {
    addSlot(day: $day, month: $month, year: $year, hour: $hour) {
      id
      day
      month
      year
      hour
    }
  }
`;

const AddSlot = () => {
  const router = useRouter();
  const [addSlot, { loading, error }] = useMutation(ADD_SLOT_MUTATION);
  const [formData, setFormData] = useState<AddSlotProps>({
    day: 0,
    month: 0,
    year: 0,
    hour: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await addSlot({
        variables: {
            day: formData.day,
            month: formData.month,
            year: formData.year,
            hour: formData.hour,
        },
      });

      // Redireccionar a la página de citas o mostrar un mensaje de éxito
      router.push('/citas');
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="day">Día</label>
      <input type="number" id="day" name="day" required onChange={handleChange} />
      <label htmlFor="month">Mes</label>
      <input type="number" id="month" name="month" required onChange={handleChange} />
      <label htmlFor="year">Año</label>
      <input type="number" id="year" name="year" required onChange={handleChange} />
      <label htmlFor="hour">Hora</label>
      <input type="number" id="hour" name="hour" required onChange={handleChange} />
      <button type="submit">Agregar horario disponible</button>
    </form>
  );
};

export default AddSlot;
