import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Slot } from "@/types"
import { DivButton, Header } from "@/pages/index"
import { client } from "@/utils/apollo-client";
import { Form } from "@/components/ComponentAddSlot";


interface bookSlotProps{
    slots: Slot[];
}

export const BOOK_SLOT_MUTATION = gql`
mutation BookSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
    bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
      hour
      month
      year
      day
      dni
    }
  }
`;

 const ComponentBookSlot = () => {
    const router = useRouter();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito
    const [showAlert, setShowAlert] = useState(false);
    const [bookSlot, { loading, error }] = useMutation(BOOK_SLOT_MUTATION,{
        onCompleted: () => {
          setShowSuccessMessage(true),
          setShowAlert(true)
        },
      });
   const [formData,setFormData] = useState({
    year:0,
    month:0,
    day:0,
    hour:0,
    dni:""
   });

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
   }

   const handleBookSlot = async() =>{
    try {
        const { data } = await bookSlot({
            variables: {
              year: formData.year,
              month: formData.month,
              day: formData.day,
              hour: formData.hour,
              dni: formData.dni,  
            },
          });
        setShowSuccessMessage(true);
        setShowAlert(true);
        

    } catch (error) {
        
    }
   }
   const handleInicio = () => {
    router.push("/");
  };

   const handleCitas = () => {
    router.push("/citas");
  };
   return(
    <>
    <Header>Book Cita</Header>
    <Form action="">
        <label htmlFor="year">Año: </label>
        <input type="number" id="year" name="year" onChange={handleChange}/>
        <label htmlFor="month">Mes: </label>
        <input type="number" id="month" name="month" onChange={handleChange}/>
        <label htmlFor="day">Día: </label>
        <input type="number" id="day" name="date" onChange={handleChange}/>
        <label htmlFor="hour">Hora: </label>
        <input type="hour" id="hour" name="hour" onChange={handleChange} />
        <label htmlFor="dni">DNI: </label>
        <input type="number" id="dni" name="dni" onChange={handleChange} />
        <button type="button" onClick={handleBookSlot}>Reservar Cita</button>

    </Form>
    <DivButton>
        <button onClick={handleInicio}>Inicio</button>
        <button onClick={handleCitas}>Ver Citas</button>
    </DivButton>
    
    </>

   )
}
  

export  default ComponentBookSlot;