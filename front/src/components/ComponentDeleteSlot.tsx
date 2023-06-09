import { Slot } from "@/types";
import { gql, useMutation } from "@apollo/client";
import { DivButton, Header } from '@/components/ComponentIndex';
import { Form } from "@/components/ComponentAddSlot"
import { useState } from "react";
import router from "next/router";
import { set } from "mongoose";


interface DeletelSlotProps {
  day: number;
  month: number;
  year: number;
  hour: number;
  dni?:string;
  available:boolean;
}

const REMOVE_SLOT_MUTATION = gql`
  mutation RemoveSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
    removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
      available
      day
      dni
      hour
      month
      year
    }
  }
`;

const ComponentDeleteSlot = () => {
  const [removeSlot, { loading, error }] = useMutation(REMOVE_SLOT_MUTATION);
  const [formData, setFormData] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
  });

  const handleRemoveSlot = async () => {
    try {
      const { year, month, day, hour } = formData;
      const { data } = await removeSlot({
        variables: {
            year: formData.year,
            month: formData.month,
            day: formData.day,
            hour: formData.hour,
          },
      });
      
      console.log("Cita eliminada:", data.removeSlot);
      alert("La cita ha sido eliminada."); 
      setFormData({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
      });
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  return (
    <>
      <Header>
        <h1>Eliminar Cita</h1>
      </Header>
      <Form>
        <label htmlFor="year">Año</label>
        <input type="number" id="year" name="year" onChange={handleChange} />
        <label htmlFor="month">Mes</label>
        <input type="number" id="month" name="month" onChange={handleChange} />
        <label htmlFor="day">Día</label>
        <input type="number" id="day" name="day" onChange={handleChange} />
        <label htmlFor="hour">Hora</label>
        <input type="number" id="hour" name="hour" onChange={handleChange} />
        <button type="button" onClick={handleRemoveSlot}>Eliminar Cita</button>
      </Form>
      <DivButton>
      <button onClick={() => router.push("/citas")}>Ver Citas</button>
      <button  onClick={() => router.push("/")}>Inicio</button>
    </DivButton>
    </>
  );
};


export default ComponentDeleteSlot;