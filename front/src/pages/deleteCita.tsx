import { Slot } from "@/types";
import { gql, useMutation } from "@apollo/client";
import { Header } from ".";
import { Form } from "@/components/ComponentAddSlot"
import { useState } from "react";
import router from "next/router";
import { set } from "mongoose";
import ComponentDeleteSlot from "@/components/ComponentDeleteSlot";

/*
Página "Remove Slot" - CSR (Client-Side Rendering):
Esta página permite al médico eliminar un horario disponible 
para una cita. Al igual que en la funcionalidad anterior, 
no es necesario obtener datos actualizados del servidor en 
tiempo real para realizar la eliminación. Por lo tanto, el CSR 
es adecuado para esta página.

*/


const deleteCita = () => {
  return(
    <ComponentDeleteSlot/>
  )
}

export default deleteCita;