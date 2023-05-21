import { client } from '@/utils/apollo-client';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { Header } from '.';
import ComponentAddSlot from '@/components/ComponentAddSlot';


//Esta página será de tipo CSR (Client-Side Rendering)
// porque la funcionalidad de agregar un horario disponible 
//no requiere datos actualizados del servidor en tiempo real 
//y puede ser manejada completamente en el lado del cliente.

 const AddCita = () => {
  return(
  <ComponentAddSlot/>
  )
}

export default AddCita;
