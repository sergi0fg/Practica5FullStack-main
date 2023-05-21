import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Slot } from "@/types"
import { DivButton, Header } from "@/pages/index"
import { client } from "@/utils/apollo-client";
import { Form } from "@/components/ComponentAddSlot";
import ComponentBookSlot  from "@/components/ComponentBookSlot";


/*
Página "Book Slot" - CSR (Client-Side Rendering):
Esta página permite al paciente reservar una cita concreta. 
Similar a la funcionalidad de "Add Slot" y "Remove Slot",
la reserva de una cita no requiere datos actualizados del 
servidor en tiempo real y puede ser manejada en el lado del cliente. 
Por lo tanto, el CSR sería adecuado para esta página.


*/

 const bookCita = () => {
    return(
        <ComponentBookSlot />
    )
 }

export default bookCita;