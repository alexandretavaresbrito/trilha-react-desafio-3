import React from 'react'
import { Controller } from "react-hook-form";

import {InputContainer, InputText, IconContainer, ErroDoTexto} from './styles';

const Input = ({leftIcon, name, control, errorMessage, ...rest}) => {


  return (
    <>
    <InputContainer>
        {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
        <Controller
        name={name}
        control={control}
        render={({ field }) =>  <InputText {...field} {...rest} />}
      /></InputContainer>
      {errorMessage ? <ErroDoTexto>{errorMessage}</ErroDoTexto> : null}
    </>
  )
}

export { Input }; 
